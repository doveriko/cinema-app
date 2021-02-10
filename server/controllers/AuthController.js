const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('./AuthConfig');

module.exports = {

    logIn(req, res) {
        let { email, password } = req.body;

        // Look for existing user
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (!user) {
                res.status(200).json({ err: "No users registered with that e-mail" });
            } else {
                if (bcrypt.compareSync(password, user.dataValues.password)) {
                    // Create token
                    let token = jwt.sign({ user: user.dataValues }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    res.json({
                        user: user.dataValues,
                        token: token
                    })
                } else {
                    // Unauthorized Access
                    res.status(200).json({ err : "Incorrect password" });
                }
            }
        }).catch(err => {
            res.status(500).json(err);
        })
    },

    signUp(req, res) {
        let { email } = req.body;

        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user) {
                res.status(200).json({ err : "That e-mail is already registered"})
            } else {
                let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
        
                    User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: password
                    }).then(user => {
                    // Create the token
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    res.json({
                        user: user,
                        token: token
                    });
                }).catch(err => {
                    res.status(500).json(err);
                })
            }
        })
    }
}