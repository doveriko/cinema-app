module.exports = {

    dbconfig: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        server: process.env.SERVERS,
        database: process.env.DATABASE,
        instanceName: process.env.INSTANCENAME,
        options: {
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: true
        }
    }
}