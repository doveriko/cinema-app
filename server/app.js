const createError = require('http-errors');
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(logger('dev'));

app.use(serveStatic(__dirname + "/dist"));
// var distDir = __dirname + "/dist/";
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(distDir));

// //here we are configuring dist to serve app files
// app.use('/', serveStatic(path.join(__dirname, '/dist')))

// // this * route is to serve project on different page routes except root `/`
// app.get(/.*/, function (req, res) {
// 	res.sendFile(path.join(__dirname, '/dist/index.html'))
// })

// API routes
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const ordersRouter = require('./routes/orders');
const sessionsRouter = require('./routes/sessions');
const roomsRouter = require('./routes/rooms');
const seatsRouter = require('./routes/seats');

// Connect to database
const sequelize = require ('./database/db');
require('./models/associations');
sequelize.sync({ force: true }).then(() => {
  console.log("Connected to database");
}).catch(error => {
  console.log("An error has ocurred", error);
});

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
//   res.setHeader("Access-Control-Allow-Origin", process.env.PUBLIC_DOMAIN); // update to match the domain you will make the request from
//   res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE');
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

//  Populate req.cookies
app.use(cookieParser());

// Routes
app.get('/', function (req, res) {
  res.send({ message: "Hello from back-end!" });
})

// Router middleware
app.use('/users', usersRouter);
app.use('/users', ordersRouter);
app.use('/movies', moviesRouter);
app.use('/sessions', sessionsRouter);
app.use('/rooms', roomsRouter);
app.use('/seats', seatsRouter);


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

// const host = '0.0.0.0';
// const port = process.env.PORT || 3000;

// app.listen(port, host, () => {
//    console.log(`Server running at http://${host}:${port}/`);
//  });

const port = process.env.PORT || 3000;
const host = process.env.YOUR_HOST || '0.0.0.0';

app.listen(port, host, function() {
  console.log(`Express server listening on port ${port}`);
})