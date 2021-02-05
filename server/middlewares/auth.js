const jwt = require('jsonwebtoken');
const authConfig = require('../controllers/AuthConfig');
const User = require('../models/User'); 

module.exports = (req, res, next) => {

    // Comprobar que existe el token
    if(!req.headers.authorization) {
        res.status(401).json({ msg: "Acceso no autorizado" });
    } else {

        // Comrpobar la validez de este token
        let token = req.headers.authorization.split(" ")[1];

        // Comprobar la validez de este token
        jwt.verify(token, authConfig.secret, (err, decoded) => {

        // Decoded es la info del usuario ("payload") que obtuvimos tras el signup -> jwt.sign({ user: user }),
        // que nos es devuelta en el objeto "decoded" al llamar a la función jwt.verify
        // console.log(decoded)

            if(err) {
                res.status(500).json({ msg: "Ha ocurrido un problema al decodificar el token", err });
            } else {
                // req.user = decoded;
                User.findByPk(decoded.user.id).then(user => {
                    req.user = user;
                    next();
                });
            }

        })
    }

};