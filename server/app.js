const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

// API routes
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const ordersRouter = require('./routes/orders');
const sessionsRouter = require('./routes/sessions');

// Connect to database
const sequelize = require ('./database/db');
require('./models/associations');
sequelize.sync({ force: false }).then(() => {
  console.log("Connected to database");
}).catch(error => {
  console.log("An error has ocurred", error);
});

const app = express();

app.use(cors({
  origin: [
    process.env.PUBLIC_DOMAIN,
    process.env.PUBLIC_DOMAINS
  ],
  credentials: true,
  exposedHeaders: ['set-cookie']
}));

//  Session setup
app.use(session({
  secret: process.env.AUTH_SECRET,
  cookie: {
    maxAge: 600000,
    secure: true
  },
  saveUninitialized: false,
  resave: false,
  unset: 'destroy'
}));

// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE');
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  Populate req.cookies
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', function (req, res) {
  res.send({ message: "Hello from back-end!" });
})

// Router middleware
app.use('/users', usersRouter);
app.use('/users', ordersRouter);
app.use('/movies', moviesRouter);
app.use('/sessions', sessionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;