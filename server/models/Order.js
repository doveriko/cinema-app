const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Orders extends Model {}
Orders.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
}, {
    sequelize,
    modelName: "order",
    timestamps: false
});

module.exports = Orders;