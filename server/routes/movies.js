var express = require('express');
var router = express.Router();
const Movie = require('../models/Movie');

// GET all movies /movies
router.get('/', (req, res, next) => {
    Movie.findAll({
        include: {
            model: Session,
            attributes: ['time']
        },
        attributes: ['name', 'description', 'imageUrl'] // Optional?
    }).then(movies => {
        res.json(movies);
    })
});

// GET one movie /movies/:id
router.get('/:id', (req, res) => {
    Movie.findByPk(req.params.id).then(post => {
        res.json(post);
    })
})

// POST one movie /movies
router.post('/', (req, res) => {
    Movie.create({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    }).then(movie => {
        res.json(movie)
    })
})

module.exports = router;
