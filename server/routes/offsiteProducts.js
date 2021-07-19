var express = require('express');
var router = express.Router();
const OffsiteProduct = require('../models/OffsiteProduct');

// POST one OffsiteProduct /offsiteproducts (route made to create seed from store)
router.post('/', (req, res) => {
    OffsiteProduct.create({
        name: req.body.name,
        unitPrice: req.body.unitPrice
    }).then( product => {
        res.json(product)
    })
})

module.exports = router;