var express = require('express');
var router = express.Router();
const Session = require('../models/Session');
const Movie = require('../models/Movie');

// POST one session /sessions
router.post('/', (req, res) => {
    Session.create({
        time: req.body.time,
        movieId: req.body.movieId // Use "body" instead of "params" to create seed from Postman
    }).then(session => {
        res.json(session)
    })
})

module.exports = router;