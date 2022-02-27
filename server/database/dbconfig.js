module.exports = {

    dbconfig: {
        username: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        database: process.env.DATABASE,
        options: {
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: true
        }
    }
}