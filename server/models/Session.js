const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Session extends Model {}
Session.init({
    time: DataTypes.DATE(6)
}, {
    sequelize,
    modelName: "session",
    timestamps: false
});

module.exports = Session;