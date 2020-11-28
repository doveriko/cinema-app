var express = require('express');
var router = express.Router();
const Order = require('../models/Order');
const Session = require('../models/Session');
const User = require('../models/User');

// GET all orders from one user /users/:id/orders
router.get('/:id/orders', (req, res) => {
    User.findByPk(req.params.id).then(user => {
        user.getOrders().then(orders => {
            res.json(orders);
        })
    });
});

// GET one specific order from a user /users/:userId/orders/:orderId
router.get('/:userId/orders/:orderId', (req, res) => {
    User.findByPk(req.params.userId).then(user => {
        user.getOrders().then(orders => {
            let orderId = req.params.orderId;
            let myOrder = [];
            myOrder = orders.find( order => order.id === orderId);
            console.log("ALL ORDERS -->", orders);
            res.json(myOrder);
        })
    });
});

// POST one order /users/:id/orders/
router.post('/:id/orders', (req, res) => {
    Order.create({
        userId: req.params.id, // Provisional
        sessionId: req.body.sessionId // Provisional
    }).then(order => {
        res.json(order);
        })
});

module.exports = router;