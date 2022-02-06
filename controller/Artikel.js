 'use strict';
let connection = require('../config/connection');
const nodemailer = require('nodemailer');
let dotenv = require('dotenv');
let env = dotenv.config();
const moment = require('moment');
// const multer = require('multer');

const fs = require('fs') 
const {promisify} = require('util')
const writeFile = promisify(fs.writeFile);
const secretKey = process.env.SECRET_KEY;
const folder = process.env.DIREKTORI_IMG;
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
let artikel = {

    getAllData: async(req, res)=>{
        try {
           
            let qry = 'SELECT * FROM artikel';
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
    getDataArtikel: async(req, res)=>{
      try {
         
          let qry = 'SELECT * FROM artikel WHERE kategori="artikel" ORDER BY waktuPembuatan DESC';
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
    getDataRenungan: async(req, res)=>{
    try {
       
      let qry = 'SELECT * FROM artikel WHERE kategori="renungan" ORDER BY waktuPembuatan DESC';
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
    addArtikel: async(req,res)=>{
        try {

        let judulArtikel = req.body.judulArtikel
        if (judulArtikel == 0 || judulArtikel == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'Judul Artikel tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        console.log(judulArtikel);  
        let isiArtikel = req.body.isiArtikel
        if (isiArtikel == 0 || isiArtikel == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'Isi Artikel tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }

          let kategori = req.body.kategori
          if (kategori == 0 || kategori == null) {
  
              let response = {
                  code: 400,
                  message: 'Error',
                  error:'kategori tidak terisi'
                };      
              res.status(400).send(response);
              return response;
            }
        let tag = req.body.tag
        if (tag == 0 || tag == null) {
    
             let response = {
                  code: 400,
                  message: 'Error',
                  error:'tag tidak terisi'
                };      
              res.status(400).send(response);
              return response;
            }
            let waktuPembuatan = getTime();
           

                let image = req.body.image
                console.log(image);
                let splitbs64 = image.split(",") 
                let splity = image.split("/")
                let splitformat = splity[1].split(";")

                let content = splitbs64[1];
                console.log(content)
                let ext_file = splitformat[0]
                console.log(ext_file)
                let encryptedString = cryptr.encrypt(judulArtikel);
                let direk = `${folder}${encryptedString}.${ext_file}`;
                let direkString = direk.toString()

                await writeFile(direk, content, "base64");
  
                let qry = `INSERT INTO artikel (judulArtikel, isiArtikel, kategori, tag, waktuPembuatan, image) VALUES('${judulArtikel}', '${isiArtikel}', '${kategori}', '${tag}', '${waktuPembuatan}', '${direkString}')`;
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
module.exports = artikel;