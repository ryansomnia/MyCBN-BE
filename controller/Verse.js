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
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.URI);

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

       
     let qry = `SELECT * FROM verse ORDER BY RAND() LIMIT 1;`
      let result = await await connection.execQry(qry);
      console.log(result);
      let response = {
                code: 200,
                message: 'success',
                data:result
              };
              res.status(200).send(response)
    }catch(err){
     let error = {
      code: 500,
      message: 'error',
      error:err
    };
      console.log(error);
      res.status(500).send(error)
    }
    },
    addVerse: async(req,res)=>{
        try {

        let isi = req.body.isi
        if (isi == 0 || isi == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'Isi Ayat tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          } 
        let kitab = req.body.kitab
        if (kitab == 0 || kitab == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'kitab tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }

          let pasal = req.body.pasal
          if (pasal == 0 || pasal == null) {
  
              let response = {
                  code: 400,
                  message: 'Error',
                  error:'pasal tidak terisi'
                };      
              res.status(400).send(response);
              return response;
            }
            let ayat = req.body.ayat
            if (ayat == 0 || ayat == null) {
    
                let response = {
                    code: 400,
                    message: 'Error',
                    error:'ayat tidak terisi'
                  };      
                res.status(400).send(response);
                return response;
              }
              const db = client.db('MyCBN');
              const collection = db.collection('verse')

              let objectVerse = {
                "kitab" : `${kitab}`,
                "pasal" : pasal,
                "ayat" : ayat,
                "isi" : `${isi}`
              }
              let result = await collection.insertOne(objectVerse);
              let response = {
                code: 200,
                message: 'success',
                data:result
              };
              res.status(200).send(response)
    
        } catch (error) {
            console.log(error);
            let response = {
                code: 500,
                message: 'error',
                error:error
              };
              res.status(500).send(response)
        }
    }

}
module.exports = verse;