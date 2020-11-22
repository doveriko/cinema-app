const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Order extends Model {}
Order.init({
}, {
    sequelize,
    modelName: "order",
    timestamps: false
});

module.exports = Order;