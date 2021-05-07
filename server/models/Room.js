const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Room extends Model {}
Room.init({
    name: DataTypes.STRING,
}, {
    sequelize,
    modelName: "room",
    timestamps: false
});

module.exports = Room;