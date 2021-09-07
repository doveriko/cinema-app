const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class OffsiteProduct extends Model {}
OffsiteProduct.init({
    name: DataTypes.STRING,
    unitPrice: DataTypes.DECIMAL(10,2),
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
}, {
    sequelize,
    modelName: "offsiteProduct",
    timestamps: false
});

module.exports = OffsiteProduct;