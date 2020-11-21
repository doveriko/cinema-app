const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Session extends Model {}
Session.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
}, {
    sequelize,
    modelName: "session",
    timestamps: false
});

module.exports = Session;