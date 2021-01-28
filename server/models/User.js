const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class User extends Model {}
User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     notNull: {
        //         msg: "This field cannot be empty"
        //     },
        //     isAlpha: {
        //         args: true,
        //         msg: "The name must only contain letters"
        //     },
        //     len: {
        //         args: [3, 255],
        //         msg: "The name entered is too short"
        //     }
        // },
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     isEmail: {
        //         args: true,
        //         err: "Please enter a valid e-mail"
        //     }
        // }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     len: {
        //         args: [6, 255],
        //         err: "The password must contain at least six characters"
        //     }
        // }
    }
}, {
    sequelize,
    modelName: "user",
    timestamps: false
});

module.exports = User;