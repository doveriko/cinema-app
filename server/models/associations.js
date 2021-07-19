const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const User = require('./User');
const Movie = require('./Movie');
const Order = require('./Order');
const Session = require('./Session');
const Seat = require('./Seat');
const Room = require('./Room');
const OffsiteProduct = require('./OffsiteProduct');

User.hasMany(Order);
Order.belongsTo(User);

Movie.hasMany(Session); 
Session.belongsTo(Movie);

Session.hasMany(Order);
Order.belongsTo(Session);

Room.hasMany(Session);
Session.belongsTo(Room);

Room.hasMany(Seat);
Seat.belongsTo(Room);

Seat.belongsToMany(Order, { through: "reserved_seats", timestamps : false });
Order.belongsToMany(Seat, { through: "reserved_seats", timestamps : false });

const ReservedOffsiteProduct = sequelize.define('reserved_offsite_products', {
    offsiteProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: OffsiteProduct,
        key: 'id'
      }
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER
    } 
  },
  { timestamps: false }
  );

OffsiteProduct.belongsToMany(Order, { through: ReservedOffsiteProduct });
Order.belongsToMany(OffsiteProduct, { through: ReservedOffsiteProduct });