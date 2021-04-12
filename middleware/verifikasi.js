const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi() {
    return function (req, rest, next) {
        let role = req.body.role
        //check authorization header
        let tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            let token = tokenWithBearer.split(' ')[1];

            //verikasi
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return rest.status(401).send({ auth: false, message: "Token tidak terdaftar !" });
                } else {
                    if (role == 2) {
                        req.auth = decoded;
                        next();
                    } else {
                        return rest.status(401).send({ auth: false, message: "Gagal meng-otorisasi role anda!" });
                    }

                }
            });
        } else {
            return rest.status(401).send({ auth: false, message: "Token tidak terdaftar !" });
        }

    }

}

function verifikasiAdmin() {
    return function (req, rest, next) {
        let role = req.body.role
        //check authorization header
        let tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            let token = tokenWithBearer.split(' ')[1];

            //verikasi
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return rest.status(401).send({ auth: false, message: "Token tidak terdaftar !" });
                } else {
                    if (role == 1) {
                        req.auth = decoded;
                        next();
                    } else {
                        return rest.status(401).send({ auth: false, message: "Gagal meng-otorisasi role anda!" });
                    }

                }
            });
        } else {
            return rest.status(401).send({ auth: false, message: "Token tidak terdaftar !" });
        }

    }

}
module.exports = { verifikasi, verifikasiAdmin };