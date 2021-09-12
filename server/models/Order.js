const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Order extends Model {}
Order.init({
    bookingCode: DataTypes.STRING,
}, {
    sequelize,
    modelName: "order",
    timestamps: false
});

module.exports = Order;