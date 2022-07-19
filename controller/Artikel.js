 'use strict';
// let connection = require('../config/Mongodb/Mongodb');
let dotenv = require('dotenv');
let env = dotenv.config();
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.URI);

        // function getTime() {
        //     let asiaTimeStart = new Date().toLocaleString("en-US", {
        //           timeZone: "Asia/Jakarta",
        //         });
        //     console.log(asiaTimeStart);
        //     let time = moment(asiaTimeStart, "MM/DD/YYYY hh:mm:ss").format(
        //           "YYYY-MM-DD hh:mm:ss"
        //         );
        //     console.log(time);
        //         return time;
        //       }           
let artikel = {

    getAllData: async(req, res)=>{
      try {       

          await client.connect()
          .then( () => {
          console.log('Connected to the database ')
        })
          .catch( (err) => {
          console.error(`Error connecting to the database. ${err}`);
        })

        const db = client.db('MyCBN');
        const collection = db.collection('article')
        let result = await collection.find({}).toArray();
        let response = {
                  code: 200,
                  message: 'success',
                  data:result
                };
                res.status(200).send(response)
      }catch(err){
        console.log(err);
      }
    },
    getDataArtikel: async(req, res)=>{
      try {
        await client.connect()
        .then( () => {
        console.log('Connected to the database ')
      })
        .catch( (err) => {
        console.error(`Error connecting to the database. ${err}`);
      })

      const db = client.db('MyCBN');
      const collection = db.collection('article')
      let result = await collection.find({kategori : 'artikel'}).toArray();
      if (0 < result.length) {
        let response = {
          code: 200,
          message: 'success',
          data:result
        };
        res.status(200).send(response)
      } else {
        let response = {
          code: 201,
          message: 'success',
          data:[]
        };
        res.status(201).send(response)
      }
   
      } catch (error) {
        let response = {
          code: 500,
          message: 'error',
          data:error
        };
        res.status(500).send(response)
      }
    },
    getDataRenungan: async(req, res)=>{
      try {
        await client.connect()
        .then( () => {
        console.log('Connected to the database ')
      })
        .catch( (err) => {
        console.error(`Error connecting to the database. ${err}`);
      })

      const db = client.db('MyCBN');
      const collection = db.collection('article')
      let result = await collection.find({kategori : 'renungan'}).toArray();
      if (0 < result.length) {
        let response = {
          code: 200,
          message: 'success',
          data:result
        };
        res.status(200).send(response)
      } else {
        let response = {
          code: 201,
          message: 'success',
          data:[]
        };
        res.status(201).send(response)
      }
   
      } catch (error) {
        let response = {
          code: 500,
          message: 'error',
          data:error
        };
        res.status(500).send(response)
      }
    },
    addArtikel: async(req,res)=>{

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
              let waktuPembuatan = new Date();
              let file = req.file
           
              if (file == 0 ||  file == null) {
         
                let response = {
                     code: 400,
                     message: 'Error',
                     error:'file tidak terisi'
                   };      
                 res.status(400).send(response);
                 return response;
               }
              
        try {
          await client.connect()
          .then( () => {
          console.log('Connected to the database ')
        })
          .catch( (err) => {
          console.error(`Error connecting to the database. ${err}`);
        })

        const db = client.db('MyCBN');
        const collection = db.collection('article')
        let objectArticle = {
          judulArtikel : `${judulArtikel}`,
          isiArtikel : `${isiArtikel}`,
          kategori : `${kategori}`,
          tag : `${tag}`,
          waktuPembuatan : `${waktuPembuatan}`,
          image : `${file.path}`

        }
        // console.log(objectArticle);
        let result = await collection.insertOne(objectArticle);
        let response = {
                  code: 200,
                  message: 'success',
                  data:result
                };
                res.status(200).send(response)
      

        } catch(err){
            console.log(err);
        }
//              
    }
}
module.exports = artikel;