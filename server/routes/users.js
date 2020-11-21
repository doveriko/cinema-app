var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send("Welcome to your USERS router")
});

module.exports = router;
