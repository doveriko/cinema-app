const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Room extends Model {}
Room.init({
    name: DataTypes.STRING,
    ticketUnitPrice: DataTypes.DECIMAL(10,2)
}, {
    sequelize,
    modelName: "room",
    timestamps: false
});

module.exports = Room;