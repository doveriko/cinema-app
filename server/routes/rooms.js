var express = require('express');
var router = express.Router();
const Room = require('../models/Room');
const Session = require('../models/Session');
const Seat = require('../models/Seat');

// GET one room /rooms
router.get('/', (req, res) => {
    Room.findAll({
        include: [
            {
                model: Session,
                attributes: ['time']
            },
            {
                model: Seat,
                attributes: ['id', 'area', 'number', 'roomId']
            },
        ],
        attributes: ['id', 'name', 'ticketUnitPrice']
    }).then(rooms => {
        res.json(rooms);
    })
})

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