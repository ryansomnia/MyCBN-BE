let dotenv = require("dotenv");
let env = dotenv.config();
const jwt = require('jsonwebtoken');
function validation() {
    return function (req, rest, next) {
        let tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            console.log('masuk');
            let token = tokenWithBearer.split(' ')[1];
            //verikasi
            jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
                if (err) {
                    console.log('err');
                    return rest.status(401).send({ auth: false, message: "Token tidak terdaftar !" });
                } else {
                    console.log('sukses');
                        req.auth = decoded;
                        next();
                }
            });
        } else {
            console.log('gagal');
            return rest.status(401).send({ auth: false, message: "Token tidak terdaftar !" });
        }

    }

}


module.exports = { validation };