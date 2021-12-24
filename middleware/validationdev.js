
const jsonwebtoken = require('jsonwebtoken')
// const cryptoJS = require("crypto-js");
const moment = require('moment')
const dotenv = require('dotenv');
const env = dotenv.config();
const secretKey = process.env.SECRET_KEY





module.exports = async function(req, res, next) {
    let reshasil ={
        ResponseCode: 401,
        ResponseDesc: '',
        ResponseException: ''
    };
    try {
    
        // for bypass
      let api = [
        '/getuser',
        '/cbn/v1/registrasi',
        'cbn/v1/otpMailConfirmation'
      ];   
  
      //  Cek API Login atau bukan
      if((api.includes(req.url)) == false){
        console.log("masuk 1.1")
       
        let token = req.headers["access-token"] ? req.headers["access-token"] : null
  
        if(token !== null){
          // Token tidak kosong
          let decoded = await jsonwebtoken.verify(token, secretKey);
          console.log(decoded)
    
          // let clientid = decoded.clientId
          // let data = JSON.stringify(req.body)

        }else{
    
          reshasil ={
            ResponseCode: 401,
            ResponseDesc: 'Failed, Token tidak ditemukan',
            ResponseException: ''
          };
  
          // let identify = getIdentities(req);
          // let dateEnd = getTime();
          // await loggerAccess.log('error', `"identities": ${identify}; "midleware": "failed"; "start": ""; "end": "${dateEnd}"; "input": "", "output": ${JSON.stringify(reshasil)}`);
  
          res.status(401).send(reshasil); 
          return; 
        }
      }else{
        // API Login
        console.log("masuk 1.2")
        next();
      }  
    } catch(err) {
      //jika token tidak terbaca atau expired
      reshasil ={
        ResponseCode: 401,
        ResponseDesc: 'Failed, Token tidak valid',
        ResponseException: ''
      };
  
      // let identify = getIdentities(req);
      // let dateEnd = getTime();
      // await loggerAccess.log('error', `"identities": ${identify}; "midleware": "failed"; "start": ""; "end": "${dateEnd}"; "input": "", "output": ${JSON.stringify(reshasil)}`);
                      
      res.status(403).send(reshasil);  
      return;
    }
  
  }