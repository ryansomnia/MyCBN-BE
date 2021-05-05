 'use strict';
let response = require('../res/res');
let connection = require('../config/connection');

const upload = require('./../helpers/image-upload')

 
// var text = 'foo © bar 𝌆 baz';
// var bytes = utf8.encode(text);
// var encoded = base64.encode(bytes);
// console.log(encoded);

let getAllData = (req, res) => {

   let qry = 'SELECT * FROM artikel';
   connection.query(qry, (error, result, rows) => {
    if (error) {
        console.log(error);
    } else {
        response.ok(result, res)
      console.log(result);
    }
})

}

let getAllRenungan = (req, res) => {

    let qry = 'SELECT * FROM artikel WHERE kodeSegment = "R1"';
    connection.query(qry, (error, result, rows) => {
     if (error) {
         console.log(error);
     } else {
         response.ok(result, res)
       console.log(result);
     }
 })
 
 }

 let getAllNews = (req, res) => {

    let qry = 'SELECT * FROM artikel WHERE kodeSegment = "N1"';
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
        kodeSegment,
        judul,
        isiArtikel,
    } = req.body

    let image = req.file.image
// let dateCreated =  Date.now

         try {
            let qry = `INSERT INTO artikel (kodeSegment, judul, image, isiArtikel, dateCreated) 
            VALUES('${kodeSegment}', '${judul}', '${image}', '${isiArtikel}', '(SELECT CURDATE())')`
        
            connection.query(qry, (error, rows, result) => {
                if (error) {
                    console.log(error);
                } else {
                    response.ok(result, res)
                    // kita bereskan besok wkwkwk
                    console.log(result,'Data berhasil ditambahkan');
                 
                }
            })
         } catch (error) {
             console.log(error);
         } 
    
}


let deleteOneData = (req, res) => {
    let id = req.body.id

    let qry = `DELETE FROM artikel WHERE  = '${id}'`

    connection.query(qry, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            response.ok('Data berhasil terhapus', res)
            console.log(result.affectedRows, 'Data berhasil terhapus');

        }
    })

}

let editOneData = (req, res) => {
    let id = req.body.id

    let {
        kodeSegment,
        judul,
        isiArtikel,

    } = req.body 


    let qry = `UPDATE user 
    SET nama = '${nama}',
    userName = '${userName}',
    password = '${password}',
    tglLahir = '${tglLahir}',
    jk = '${jk}'
     WHERE idUser = '${id}'`

    connection.query(qry, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            response.ok('Data berhasil diubah', res)
            console.log(result.affectedRows, 'Data berhasil diubah');

        }
    })

}



module.exports = {
    getAllData,
    getAllRenungan,
    getAllNews,
    addOneData,
    deleteOneData,
    editOneData

}