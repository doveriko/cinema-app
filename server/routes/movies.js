var express = require('express');
var router = express.Router();
const Movie = require('../models/Movie');
const Session = require('../models/Session');

// GET all movies /movies
router.get('/', (req, res, next) => {
    Movie.findAll({
        include: {
            model: Session,
            attributes: ['time']
        },
        attributes: ['id', 'title', 'description', 'imageUrl'] // Optional?
    }).then(movies => {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(movies);
    })
});

// GET one movie /movies/:id
router.get('/:id', (req, res) => {
    Movie.findByPk(req.params.id).then(movie => {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(movie);
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
