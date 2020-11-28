const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class User extends Model {}
User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo no puede ser nulo"
            },
            isAlpha: {
                args: true,
                msg: "El nombre solo puede contener letras"
            },
            len: {
                args: [3, 255],
                msg: "El nombre tiene que ser entre 3 y 255 caracteres"
            }
        },
    }, 
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: {
                args: true,
                msg: "El campo tiene que ser un correo valido"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 255],
                msg: "La contraseña tiene que tener al menos 6 caracteres"
            }
        }
    }
}, {
    sequelize,
    modelName: "user",
    timestamps: false
});

module.exports = User;