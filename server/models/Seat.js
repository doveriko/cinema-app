const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Seat extends Model {}
Seat.init({
    area: DataTypes.STRING,
    number: DataTypes.INTEGER
}, {
    sequelize,
    modelName: "seat",
    timestamps: false
});

module.exports = Seat;