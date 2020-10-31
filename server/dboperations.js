function createConnection() {

  var config = {
    authentication: {
      options: {
        userName: process.env.USERNAME,
        password: process.env.PASSWORD,
      },
      type: "default"
    },
    server: process.env.SERVER,
    options: {
      database: process.env.DATABASE,
      enableArithAbort: true,
      encrypt: true
    }
  };
  
  var Connection = require('tedious').Connection;
  var connection = new Connection(config);
  connection.on('connect', (err) => console.log("Connected", err));  
  connection.on('debug', (err) => console.log('debug:', err));
  
  return connection;
}

function createRequest(query, connection) {

  var Request = require('tedious').Request;
  var req =
      new Request(query, 
              function (err, rowCount) {
                      if (err) {
                          console.trace(err);
                          throw err;
                      }
                      connection && connection.close();
                      console.log('Connection closed');
              });
      req.on("row", columns => {
        columns.forEach(column => {
        console.log("%s\t%s", column.metadata.colName, column.value);
        });
      });
  return req;
}

function stream (query, connection, output, defaultContent) {
  var request = query;
  if (typeof query == "string") {
      request = createRequest(query, connection);
  }

  var empty = true;
  request.on('row', function (result) {
      if(empty) {
          console.log('Response fetched from SQL Database!');
          empty = false;
      }
      // output.json(result);
      // output.write(result[0].metadata.colName);
      output.write(result[0].value);
  });

  request.on('done', function (rowCount, more, rows) {
      _OnDone(empty, defaultContent, output);
  });

  request.on('doneProc', function (rowCount, more, rows) {
      _OnDone(empty, defaultContent, output);
  });

  executeRequest (request, connection);
}

function _OnDone(empty, defaultContent, output) { 
      if(empty) { 
          output.write(defaultContent);
          console.log('No results from database - default content is returned.');
      } 
      try {
          console.log('Closing Http Response output.');
          output.end();
      } catch (err) {  
          console.error(err);
      }
  }

function executeRequest (request, connection) { 

  connection.on('connect', function (err) {
      if (err) {
          console.trace(err);
          throw err;
      }
      connection.execSql(request);
      console.log("Request completed", request);
  });
}

module.exports.createConnection = createConnection;
module.exports.createRequest = createRequest;
module.exports.executeRequest = executeRequest;
module.exports.stream = stream;