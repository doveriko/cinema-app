var express = require('express');
var router = express.Router();
const Session = require('../models/Session');
const Movie = require('../models/Movie');

// POST one session /sessions (route made to create seed from store)
router.post('/', (req, res) => {
    Session.create({
        id: req.body.id,
        time: req.body.time,
        movieId: req.body.movieId, // Use "body" instead of "params" to associate tables manually in seed
        roomId: req.body.roomId // Use "body" instead of "params" to associate tables manually in seed
    }).then(session => {
        res.json(session)
    })
})

module.exports = router;