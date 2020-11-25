const sequelize = require('./database/db');
const User = require('./models/User');
const Movie = require('./models/Movie');
const Session = require('./models/Session');
require('./models/associations');
require('dotenv').config();

// User
const users = [
    { name: "Anton", email: "azr@azr.es", password: "Antonquetevi" },
    { name: "Pepe", email: "pepe@gmail.com", age: "Pepeunpurito" },
    { name: "Lucia", email: "lucia@hotmail.com", age: "LuciaPacoDe" },
];

// Movie
const movies = [
    {
        name: "Jurassic Park",
        description: "A dinosaurs movie",
        imageUrl: "www.jurassic-park.com"
    },
    {
        name: "Kill Bill",
        description: "A Tarantino movie",
        imageUrl: "www.killbill.com"
    },
    {
        name: "The Lion King",
        description: "A Disney movie",
        imageUrl: "www.thelionking.com"
    },
];

// Session
const sessions = [
    { time: '2017-10-01 13:30:00', movieId: 1 },
    { time: '2017-10-01 18:30:00', movieId: 1 },
    { time: '2017-10-01 13:30:00', movieId: 2 },
    { time: '2017-10-01 18:30:00', movieId: 2 },
    { time: '2017-10-01 13:30:00', movieId: 3 },
    { time: '2017-10-01 18:30:00', movieId: 3 }
];

sequelize.sync({ force: false }).then(() => {
    // Connection established
    console.log("Connection established...");
}).then(() => {
    // Fill users
    users.forEach(user => User.create(user));
}).then(() => {
    // Fill movies
    movies.forEach(movie => Movie.create(movie));
}).then(() => {
    // Fill sessions
    sessions.forEach(session => Session.create(session));
});