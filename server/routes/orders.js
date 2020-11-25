var express = require('express');
var router = express.Router();
const Order = require('../models/Order');

// GET one user's orders /users/:id/orders
router.get('/:id/orders', (req, res) => {
    User.findByPk(req.params.id).then(user => {
        user.getOrder().then(orders => {
            res.json(orders);
        })
    });
});

// GET one specific order from a user /users/:id/orders/:id
router.get('/:userId/orders/:orderId', (req, res) => {
    User.findByPk(req.params.userId).then(user => {
        user.getOrder().then(orders => {
            let orderId = req.params.orderId;
            let myOrder = orders.find( order => order.id === orderId);
            res.json(myOrder);
        })
    });
});

// POST one order /users/:id/orders/
router.post('/:id/orders', (req, res) => {
    Order.create({
        userId: req.params.id, // Provisional...
        sessionId: req.body.sessionId // Provisional...
    }).then(order => {
        res.json(order);
        })
});

module.exports = router;