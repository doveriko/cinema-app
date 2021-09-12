var express = require('express');
var router = express.Router();
const Order = require('../models/Order');
const Session = require('../models/Session');
const User = require('../models/User');
const Seat = require('../models/Seat');
const Movie = require('../models/Movie');
const Room = require('../models/Room');
const OffsiteProduct = require('../models/OffsiteProduct');
const sequelize = require('../database/db');

//Middleware to protect private routes
const auth = require('../middlewares/auth');

// GET all orders from one user /orders/:id
router.get('/:id', (req, res) => {
    User.findByPk(req.params.id, {
        include: [
            {
                model: Order,
                attributes: ['id', 'bookingCode'],
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
                        model: OffsiteProduct,
                        attributes: ['id', 'name', 'unitPrice'],
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
        ],
        attributes: ['bookingCode']
    }).then(users => res.json(users));
});

// POST one order /orders/:userId
router.post('/:userId', auth, async (req, res) => {
    let t = await sequelize.transaction()

    try { 
        let order = await Order.create({
            userId: req.body.userId,
            sessionId: req.body.sessionId,
            bookingCode: req.body.bookingCode
        }, {
            transaction: t
        })
    
        await order.addSeats(req.body.seats, { transaction: t })
        await order.addOffsiteProducts(req.body.offsiteProducts.ids, { through : { quantity : req.body.offsiteProducts.quantities }, transaction: t })
    
        await t.commit()
    } catch (err) {
        if (t) {
            await t.rollback()
        }
    }
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