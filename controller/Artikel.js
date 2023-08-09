 'use strict';
 const connection = require('../config/MySQL');
 const moment = require('moment')
let dotenv = require('dotenv');
let env = dotenv.config();
const mongodb = require('mongodb');
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.URI);

const path = require('path')
const fs = require('fs')
        function getFullTime() {
            let asiaTimeStart = new Date().toLocaleString("en-US", {
                  timeZone: "Asia/Jakarta",
                });
            console.log(asiaTimeStart);
            let time = moment(asiaTimeStart, "MM/DD/YYYY").format(
                  "YYYY-MM-DD"
                );
            console.log(time);
                return time;
              }   
  
                   
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
        console.log('db',db);
        const collection = db.collection('article')
        let result = await collection.find({}).toArray();
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
    getDataByKategori: async(req, res)=>{
      let kategori = req.body.kategori;
      try {
       let qry = `SELECT * FROM artikel WHERE kategori = '${kategori}'`
       let result = await connection.execQry(qry);

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
    getOneDetail: async(req, res)=>{
      let id = req.body.id
      console.log('1',id);
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
      let result = await collection.findOne({_id: mongodb.ObjectId(id)});
      console.log('2',result);
      if (0 < Object.keys(result).length) {
        let response = {
          code: 200,
          message: 'success',
          data:result
        };
        console.log('3');
        res.status(200).send(response)
      } else {
        let response = {
          code: 201,
          message: 'success',
          data:[]
        };
        console.log('4');
        res.status(201).send(response)
      }
   
      } catch (error) {
        let response = {
          code: 500,
          message: 'error',
          data:error
        };
        console.log('5', error);
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
              // let waktuPembuatan = getFullTime();

              let image = req.files.image;
              console.log("img",image);
              let filesize = image.size;
              let ext = path.extname(image.name);
              let filename = image.md5 + ext;
              const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
              let allowedType = ['.png', '.jpg', '.jpeg'];

              if (!allowedType.includes(ext.toLowerCase())) {
                return res.status(422).json({msg: "invalid Image"})
              }
              if (filesize > 5000000) {
                return res.status(422).json({msg: " Size overload"})
              }
           
              if (image   == 0 ||  image   == null) {
         
                let response = {
                     code: 400,
                     message: 'Error',
                     error:'articleImage   tidak terisi'
                   };      
                 res.status(400).send(response);
                 return response;
               }
              image.mv(`./public/images/${filename}`,async(err)=>{
                if(err){
                  return res.status(500).json({msg: err.message});
                }

                try {
               
        
                let insertQry = `INSERT INTO artikel (judulArtikel, isiArtikel, kategori, tag, waktuPembuatan, image, url )
                VALUES ('${judulArtikel}', '${isiArtikel}', '${kategori}', '${tag}', '${getFullTime()}', '${filename}', '${url}')`
                
                let hasilInsert = await connection.execQry(insertQry);
                console.log("hasilInsert",hasilInsert);
                 let response = {
                    code: 201,
                    message: 'success',
                    data: "data berhasil masuk"
                  };
                 console.log(response)
              return res.status(201).send(response)
        
                } catch(err){
                  console.log(err);
                  let response = {
                      code: 500,
                      message: 'error',
                      error:err
                    };
                    res.status(500).send(response)
                }

              })
        
//              
    },
    deleteOneData : async(req,res)=>{
      let id = req.body.id
     console.log(id);
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
      let data = await collection.findOne({_id : new mongodb.ObjectId(id)});
      const filePath = `./public/images/${data.image}`
        fs.unlinkSync(filePath);
        let result = await collection.deleteOne({_id : new mongodb.ObjectId(id)});
      if (0 < result.deletedCount) {
        let response = {
          code: 200,
          message: 'success delete',
          data:result
        };
        res.status(200).send(response)
      } else{
        let response = {
        code: 401,
        message: 'cant delete'
      };
      res.status(401).send(response)
      }
      

      } catch (error) {
        console.log(error);
      }
    }
    ,
    // editOneData : async(req, res) =>{

    // }
}
module.exports = artikel;