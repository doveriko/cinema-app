var express = require('express');
var router = express.Router();

var TYPES = require('tedious').TYPES;
var db = require('../dboperations');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
