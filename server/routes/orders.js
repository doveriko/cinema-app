var express = require('express');
var router = express.Router();
const Order = require('../models/Order');
const Session = require('../models/Session');
const User = require('../models/User');
const Seat = require('../models/Seat');
const Movie = require('../models/Movie');

//Middleware to protect private routes
const auth = require('../middlewares/auth');

// GET all orders from one user /users/:id/orders
// router.get('/:id/orders', auth, (req, res) => {
//     User.findByPk(req.params.id, {
//         include: [
//             {
//                 model: Order,
//                 attributes: ['id'],
//                 include: [
//                     {
//                         model: Session,
//                         attributes: ['time']
//                     }
//                     // {
//                     //     model: Seat,
//                     //     attributes: []
//                     // }
//                 ]
//             },
//         ],
//         attributes: []
//     }).then(users => res.json(users));
// });

router.get('/:id/orders', (req, res) => {
    User.findByPk(req.params.id, {
        include: [
            {
                model: Order,
                attributes: ['id'],
                include: [
                    {
                        model: Seat,
                        attributes: [],
                      }
                ],
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

// router.get('/', (req, res) => {
//     Order.findAll({
//         include: {
//             model: Seat
//         }
//         }).then(users => res.json(users));
// });

// router.get('/:id', (req, res) => {
//     Order.findByPk(req.params.id).then(user => {
//         user.getSeats().then(domicilio => {
//             res.json(domicilio);
//         })
//     });
// });

// POST one order /users/:id/orders/
router.post('/:userId/orders', auth, (req, res) => {
    Order.create({
            userId: req.body.userId, // Provisional
            sessionId: req.body.sessionId, // Provisional
            seats: req.body.seats // Array ?
        },
        {
            include: {
            model: Seat
        }
    }).then(order => {
        res.json(order);
    })
});

// Delete one order /users/orders/:orderId
router.delete('/orders/:orderId', auth, (req, res) => {
    Order.destroy({
        where: {
            id : req.params.orderId
        }
    })
});

module.exports = router;