const User = require('./User');
const Movie = require('./Movie');
const Order = require('./Order');
const Session = require('./Session');

User.hasMany(Order);
Order.belongsTo(User);

Movie.hasMany(Session);
Session.belongsTo(Movie);

Session.hasMany(Order);
Order.belongsTo(Session);