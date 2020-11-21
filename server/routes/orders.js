var express = require('express');
var router = express.Router();
const Order = require('../models/Order');

/* GET Orders listing. */
router.get('/', (req, res, next) => {
    res.send("Welcome to your ORDERS router")
});

module.exports = router;