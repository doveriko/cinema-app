var express = require('express');
var router = express.Router();
const Order = require('../models/Order');
const Session = require('../models/Session');
const User = require('../models/User');
const Movie = require('../models/Movie');

//Middleware to protect private routes
const auth = require('../middlewares/auth');

// GET all orders from one user /users/:id/orders
router.get('/:id/orders', (req, res) => {
    User.findByPk(req.params.id, {
        include: [
            {
                model: Order,
                attributes: ['userId'],
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
                    }
                ]
            },
        ],
        attributes: []
    }).then(users => res.json(users));
});

// GET one specific order from a user /users/:userId/orders/:orderId
router.get('/:userId/orders/:orderId', (req, res) => {
    User.findByPk(req.params.userId).then(user => {
        user.getOrders().then(orders => {
            let orderId = req.params.orderId; 
            let myOrder = [];
            myOrder = orders.find( order => order.id === orderId);
            console.log("ALL ORDERS -->", orders);
            res.json(myOrder); // Not working
        })
    });
});

// POST one order /users/:id/orders/
router.post('/:userId/orders', (req, res) => {
    Order.create({
        userId: req.body.userId, // Provisional
        sessionId: req.body.sessionId // Provisional
    }).then(order => {
        res.json(order);
        })
});

module.exports = router;