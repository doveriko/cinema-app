var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const Session = require('../models/Session');
const Movie = require('../models/Movie');

// Authentication controller
const AuthController = require('../controllers/AuthController')

// GET all users /users
router.get('/', (req, res) => {
  User.findAll({
    include: {
      model: Order,
      attributes: ['id', 'sessionId']
    },
    attributes: ['name', 'email']
  }).then(users => res.json(users));
});

// GET one user /users/:id
router.get('/:id', (req, res) => {
  User.findByPk(req.params.id, {
    include: {
      model: Order,
      attributes: ['id', 'sessionId']
    },
    attributes: ['name', 'email']
  }).then(user => {
    res.json(user);
  })
});

// CREATE one user (Sign up) /users/signup
router.post('/signup', AuthController.signUp);

// Log in a user /users/login
router.post('/login', AuthController.logIn);

// UPDATE one user /users/:id
router.patch('/:id', (req, res) => {
  User.update({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password // Provisional
  }, {
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result);
  });
});

// DELETE one user /users/:id
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result);
  })
});

module.exports = router;
