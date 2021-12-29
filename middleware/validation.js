
const jsonwebtoken = require('jsonwebtoken')
const cryptoJS = require("crypto-js");
const moment = require('moment')
const dotenv = require('dotenv');
const env = dotenv.config();

const secretKey = process.env.SECRET_KEY


module.exports = async function (req,res,next) {
    let reshasil ={
        code: 401,
        description: ''
    };

    try {
        let api =[
            "/cbn/v1/registrasi","/cbn/v1/ValidateAccount"
        ];

        if((api.includes(req.url)) == false){
                console.log("masuk 1.1")

            let token = req.headers["access-token"] ? req.headers["access-token"] : null
            
            if (token !== null) {
                    let decoded = await jsonwebtoken.verify(token, secretKey);
                    console.log(decoded)
                    let clientid = decoded.clientId
                    console.log("clientid",clientid);
                    let data = JSON.stringify(req.body)
                   console.log("data",data);
                }else{
                    reshasil ={
                        code: 401,
                        description: 'Failed, Token tidak ditemukan'
            
                      };
                      res.status(401).send(reshasil); 
                     return; 
                }
            }else{
                    console.log("masuk 1.2")
                    next()
                }
        } catch (err) {
        reshasil ={
            code: 403,
            description: 'Sesi Anda telah berakhir Silahkan Log in kembali'

          };

          res.status(403).send(reshasil);  
          return;
    }
}