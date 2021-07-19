var express = require('express');
var router = express.Router();
const Order = require('../models/Order');
const Session = require('../models/Session');
const User = require('../models/User');
const Seat = require('../models/Seat');
const Movie = require('../models/Movie');
const Room = require('../models/Room');
const OffsiteProduct = require('../models/OffsiteProduct');

//Middleware to protect private routes
const auth = require('../middlewares/auth');

// GET all orders from one user /orders/:id
router.get('/:id', (req, res) => {
    User.findByPk(req.params.id, {
        include: [
            {
                model: Order,
                attributes: ['id'],
                include: [
                    {
                        model: Session,
                        attributes: ['time'],
                        include: [
                          {
                            model: Movie,
                            attributes: ['title'],
                          }
                        ]
                    },
                    {
                        model: Seat,
                        include: [
                            {
                              model: Room,
                              attributes: ['name', 'ticketUnitPrice'],
                            }
                        ]
                    },
                    {
                        model: OffsiteProduct
                    }
                ]
            }
        ],
        attributes: []
    }).then(users => res.json(users));
});

// GET all orders from all users /orders
router.get('/', (req, res) => {
    Order.findAll({
        include: [{
            model: Seat
        },
        {
            model: OffsiteProduct
        }
        ]}).then(users => res.json(users));
});

// POST one order /orders/:userId
router.post('/:userId', auth, (req, res) => {
    Order.create({
            userId: req.body.userId,
            sessionId: req.body.sessionId,
            seats: req.body.seats,
            offsiteProducts: req.body.offsiteProducts // Aquí habrá que meter 'id' y 'name' de cada offsite product + la 'quantity' asignada a la junction table 'reserved_offsite_products'
        },
        {
        include: [
            {
                model: Seat,
                attributes: ['area', 'number', 'roomId']
            },
            {
                model: OffsiteProduct,
                attributes: ['name', 'unitPrice']
            }
        ]
    }).then(order => {
        res.json(order);
    })
});

// Delete one order /orders/:orderId
router.delete('/:orderId', auth, (req, res) => {
    Order.destroy({
        where: {
            id : req.params.orderId
        }
    })
});

module.exports = router;