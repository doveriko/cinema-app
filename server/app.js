const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
require('dotenv').config();

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const ordersRouter = require('./routes/orders');

const app = express();
const sequelize = require ('./database/db');
require('./models/associations');

// Routes
app.get('/', function (req, res) {
  res.send('Hello, World!')
})

sequelize.sync({ force: true }).then(() => {
  console.log("Connected to database");
}).catch(error => {
  console.log("An error has ocurred", error);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router middleware
app.use('/users', usersRouter);
app.use('/users', ordersRouter);
app.use('/movies', moviesRouter);

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
