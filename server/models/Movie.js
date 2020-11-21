const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Movie extends Model {}
Movie.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
}, {
    sequelize,
    modelName: "movie",
    timestamps: false
});

module.exports = Movie;