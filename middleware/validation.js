let dotenv = require("dotenv");
let env = dotenv.config();
const jwt = require('jsonwebtoken');
function validation() {
    return function (req, rest, next) {
        let tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            let token = tokenWithBearer.split(' ')[1];
            //verikasi
            jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
                if (err) {
                    return rest.status(401).send({ auth: false, message: "Token tidak terdaftar !" });
                } else {
                        req.auth = decoded;
                        next();
                }
            });
        } else {
            return rest.status(401).send({ auth: false, message: "Token tidak terdaftar !" });
        }

    }

}


module.exports = { validation };