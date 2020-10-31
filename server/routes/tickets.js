var express = require('express');
var router = express.Router();

var db = require('../dboperations');
var TYPES = require('tedious').TYPES;

router.get('/', function(req, res, next) {
  
  let reqStr = `SELECT TOP 20 pc.Name as CategoryName,
              p.name as ProductName FROM SalesLT.ProductCategory pc
              JOIN SalesLT.Product p ON pc.productcategoryid = p.productcategoryid;`;

  var connection = db.createConnection();

  db.stream(reqStr, connection, res, '[]');

  // request = new Request(reqDb, (err) => console.log(err));

  // Print the rows read
  // var result = "";
  // request.on('row', function(columns) {
  //     columns.forEach(function(column) {
  //         if (column.value === null) {
  //             console.log('NULL');
  //         } else {
  //             result += column.value + " ";
  //         }
  //     });
  //     console.log("HOLA 1", result);
  //     result = "";
  // });

  // request.on("row", columns => {
  //   columns.forEach(column => {
  //     console.log("HOLA 2 %s\t%s", column.metadata.colName, column.value);
  //   });
  // });

  // Execute SQL statement
  // connection.execSql(request);
});

// router.post('/', function(req, res, next) {

//   let reqDb = `INSERT SalesLT.Product
//               (Name, ProductNumber, StandardCost, ListPrice, SellStartDate)
//               OUTPUT INSERTED.ProductID VALUES
//               (@Name, @Number, @Cost, @Price, CURRENT_TIMESTAMP);`;

//   request = new Request(reqDb, (err) => console.log(err));
//      request.addParameter('Name', TYPES.NVarChar, req.body.name);  
//      request.addParameter('Number', TYPES.NVarChar, req.body.number);  
//      request.addParameter('Cost', TYPES.Int, req.body.cost);  
//      request.addParameter('Price', TYPES.Int, req.body.price);  
     
//      request.on('row', columns => {  
//          columns.forEach(column => {  
//            if (column.value === null) console.log('NULL');  
//            else console.log("Product id of inserted item is " + column.value);
//          });  
//      });
//      connection.execSql(request);
// });

module.exports = router;
