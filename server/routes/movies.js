var express = require('express');
var router = express.Router();
const Movie = require('../models/Movie');
const Session = require('../models/Session');

// GET all movies /movies
router.get('/', (req, res, next) => {
    Movie.findAll({
        include: {
            model: Session,
            attributes: ['id', 'time', 'movieId']
        },
        attributes: ['id', 'title', 'description', 'imageUrl']
    }).then(movies => {
        res.json(movies);
    })
});

// GET one movie /movies/:id
router.get('/:id', (req, res) => {
    Movie.findByPk(req.params.id, { include: {
        model: Session,
        attributes: ['id', 'time', 'movieId']
    } }).then(movie => {
        res.json(movie);
    })
})

// POST one movie /movies (route made to create seed from store)
router.post('/', (req, res) => {
    Movie.create({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    }).then(movie => {
        res.json(movie)
    })
})

module.exports = router;
