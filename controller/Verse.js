'use strict';
let connection = require('../config/MySQL');
let dotenv = require('dotenv');
let env = dotenv.config();
const fs = require('fs') 
const {promisify} = require('util')
const writeFile = promisify(fs.writeFile);
const secretKey = process.env.SECRET_KEY;
const folder = process.env.DIREKTORI_IMG_DEV;
const Cryptr = require('cryptr')
const cryptr = new Cryptr(secretKey);


        function getTime() {
            let asiaTimeStart = new Date().toLocaleString("en-US", {
                  timeZone: "Asia/Jakarta",
                });
            console.log(asiaTimeStart);
            let time = moment(asiaTimeStart, "MM/DD/YYYY hh:mm:ss").format(
                  "YYYY-MM-DD hh:mm:ss"
                );
            console.log(time);
                return time;
              }           
let verse = {

    getVerse: async(req, res)=>{
        try {
           
            let qry = 'SELECT * FROM verse LIMIT 1';
            let hasil = await connection.execQry(qry)
            let response = {
                code: 200,
                message: 'success',
                data: hasil
              };
             console.log(response)
              res.status(200).send(response)
        return hasil

        } catch (error) {
            console.log(error);
            let response = {
                code: hasil.code,
                message: hasil.message,
                error:error
              };
              res.status(400).send(response)
        }
    },
    addVerse: async(req,res)=>{
        try {

        let isiAyat = req.body.isiAyat
        if (isiAyat == 0 || isiAyat == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'Isi Ayat tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          } 
        let Kitab = req.body.Kitab
        if (Kitab == 0 || Kitab == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'kitab tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }

          let pasalAyat = req.body.pasalAyat
          if (pasalAyat == 0 || pasalAyat == null) {
  
              let response = {
                  code: 400,
                  message: 'Error',
                  error:'pasalAyat tidak terisi'
                };      
              res.status(400).send(response);
              return response;
            }
                let qry = `INSERT INTO gppkcbn.verse VALUES(${isiAyat},${Kitab},${pasalAyat})`
                let hasil = await connection.execQry(qry)
                let response = {
                    code: 200,
                    message: 'success',
                  };
                 console.log(response)
                  res.status(200).send(response)
            return hasil
    
        } catch (error) {
            console.log(error);
            let response = {
                code: hasil.code,
                message: hasil.message,
                error:error
              };
              res.status(400).send(response)
        }
    }

}
module.exports = verse;