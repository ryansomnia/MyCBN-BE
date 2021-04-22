'use strict';
let response = require('../res/res');
let connection = require('../config/connection');
// const fs = require('fs')
// const base64 = fs.readFileSync("path-to-image.jpg", "base64");
const multer = require('multer')
const upload = multer({dest: 'image/'})
var base64 = require('base-64');
var utf8 = require('utf8');

const moment = require('moment');
 
// var text = 'foo © bar 𝌆 baz';
// var bytes = utf8.encode(text);
// var encoded = base64.encode(bytes);
// console.log(encoded);

let getAllData = (req, res) => {

   let qry = 'SELECT * FROM listdoa';
   connection.query(qry, (error, result, rows) => {
    if (error) {
        console.log(error);
    } else {
        response.ok(result, res)
      console.log(result);
    }
})

}


 let getbyUser = (req, res) => {

    let nama = req.body.nama

    let qry = `SELECT * FROM listdoa WHERE nama = "${nama}"`;
    connection.query(qry, (error, result, rows) => {
     if (error) {
         console.log(error);
     } else {
         response.ok(result, res)
       console.log(result);
     }
 })
 
 }


let addOneData = (req, res) => {
    
    let {
       nama,
       noHP,
       isiDoa
    } = req.body
// let dateCreated =  Date.now
let waktuRequest = moment().format("YYYY-MM-DD")


         try {
            let qry = `INSERT INTO listdoa (nama, noHP, waktuRequest, isiDoa) 
            VALUES('${nama}', '${noHP}', '${waktuRequest}', '${isiDoa}')`
        
            connection.query(qry, (error, rows, result) => {
                if (error) {
                    console.log(error);
                } else {
                    response.ok(result, res)
                    console.log(result,'Data berhasil ditambahkan');
                 
                }
            })
         } catch (error) {
             console.log(error);
         } 
    
}


let deleteOneData = (req, res) => {
    let ID = req.body.ID

    let qry = `DELETE FROM listdoa WHERE  = '${ID}'`

    connection.query(qry, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            response.ok('Data berhasil terhapus', res)
            console.log(result.affectedRows, 'Data berhasil terhapus');

        }
    })

}

module.exports = {
    getAllData,
    getbyUser,
    addOneData,
    deleteOneData

}