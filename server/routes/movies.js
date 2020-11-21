var express = require('express');
var router = express.Router();
const Movie = require('../models/Movie');

router.get('/', (req, res, next) => {
    res.send("Welcome to your MOVIES router")
});

router.post('/', (req, res) => {
    Movie.create({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    }).then(movie => {
        res.json(movie)
    })
})

router.get('/:id', (req, res) => {
    Movie.findByPk(req.params.id).then(post => {
        res.json(post);
    })
})

module.exports = router;
