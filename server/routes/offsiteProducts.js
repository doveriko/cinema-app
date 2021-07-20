var express = require('express');
var router = express.Router();
const OffsiteProduct = require('../models/OffsiteProduct');

router.get('/', (req, res, next) => {
    OffsiteProduct.findAll({
        attributes: ['id', 'name', 'unitPrice', 'description', 'imageUrl']
    }).then(movies => {
        res.json(movies);
    })
});

// POST one OffsiteProduct /offsiteproducts (route made to create seed from store)
router.post('/', (req, res) => {
    OffsiteProduct.create({
        name: req.body.name,
        unitPrice: req.body.unitPrice,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    }).then( product => {
        res.json(product)
    })
})

module.exports = router;