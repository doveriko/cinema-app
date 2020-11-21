const { Sequelize } = require('sequelize');
const { dbconfig } = require('./dbconfig');

const sequelize = new Sequelize(
    dbconfig.database,
    dbconfig.username,
    dbconfig.password, {
        host: dbconfig.host,
        dialect: 'mssql'
    },
);

module.exports = sequelize;