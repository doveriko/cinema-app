var express = require('express');
var router = express.Router();
const Seat = require('../models/Seat');

// POST one seat /seats (route made to create seed from store)
router.post('/', (req, res) => {
    Seat.create({
        area: req.body.area,
        number: req.body.number,
        roomId: req.body.roomId
    }).then(seat => {
        res.json(seat)
    })
})

// POST one seat /seats (route made to create seed from store)
router.get('/', (req, res) => {
    Seat.findAll({
    }).then(seat => {
        res.json(seat)
    })
})

module.exports = router;