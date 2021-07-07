var express = require('express');
var router = express.Router();
const Order = require('../models/Order');
const Session = require('../models/Session');
const User = require('../models/User');
const Seat = require('../models/Seat');
const Movie = require('../models/Movie');

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
                        model: Seat
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
        include: {
            model: Seat
        }
        }).then(users => res.json(users));
});

// router.get('/:id', (req, res) => {
//     Order.findByPk(req.params.id).then(user => {
//         user.getSeats().then(domicilio => {
//             res.json(domicilio);
//         })
//     });
// });

// POST one order /orders/:userId
router.post('/:userId', auth, (req, res) => {
    Order.create({
            userId: req.body.userId, // Provisional
            sessionId: req.body.sessionId, // Provisional
            seats: req.body.seats // Array ?
        },
        {
            include: {
            model: Seat,
            attributes: ['area', 'number', 'roomId']
        }
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