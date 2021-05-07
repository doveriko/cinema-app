const User = require('./User');
const Movie = require('./Movie');
const Order = require('./Order');
const Session = require('./Session');
const Seat = require('./Seat');
const Room = require('./Room');

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