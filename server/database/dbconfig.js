module.exports = {

    dbconfig: {
        username: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        server: process.env.SERVER,
        database: process.env.DATABASE,
        instanceName: process.env.INSTANCENAME,
        options: {
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: true
        }
    }
}