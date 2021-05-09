var express = require('express');
var router = express.Router();
const Room = require('../models/Room');

// POST one room /rooms (route made to create seed from store)
router.post('/', (req, res) => {
    Room.create({
        id: req.body.id,
        name: req.body.name,
        ticketUnitPrice: req.body.ticketUnitPrice
    }).then(room => {
        res.json(room)
    })
})

module.exports = router;