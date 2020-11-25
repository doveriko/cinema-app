const { Sequelize } = require('sequelize');
const { dbconfig } = require('./dbconfig');

const sequelize = new Sequelize(
    dbconfig.database,
    dbconfig.username,
    dbconfig.password, {
        host: dbconfig.host,
        server: dbconfig.server,
        dialect: 'mssql',
        dialectOptions: {
        options: {
            encrypt: true,
        }
    }
    });

module.exports = sequelize;