 'use strict';
let response = require('../res/res');
let connection = require('../config/connection');
// const fs = require('fs')
// const base64 = fs.readFileSync("path-to-image.jpg", "base64");
const multer = require('multer')
const upload = multer({dest: 'image/'})
var base64 = require('base-64');
var utf8 = require('utf8');
 
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




let addOneData = (req, res) => {
    
    let {
        kodeSegment,
        judul,
        isiArtikel
    } = req.body 



            let qry = `INSERT INTO artikel (kodeSegment, judul, image, isiArtikel) 
            VALUES('${kodeSegment}', '${judul}', '${image}', '${isiArtikel}')`
        
            connection.query(qry, (error, rows, result) => {
                if (error) {
                    console.log(error);
                } else {
                    response.ok(rows, res)
                    console.log(res,'Data berhasil ditambahkan');
                }
            })
    
}


// let deleteOneData = (req, res) => {
//     let id = req.body.id

//     let qry = `DELETE FROM artikel WHERE  = '${id}'`

//     connection.query(qry, (error, result) => {
//         if (error) {
//             console.log(error);
//         } else {
//             response.ok('Data berhasil terhapus', res)
//             console.log(result.affectedRows, 'Data berhasil terhapus');

//         }
//     })

// }

// let editOneData = (req, res) => {
//     let id = req.body.id

//     let nama = req.body.nama,
//         userName = req.body.userName,
//         password = req.body.password,
//         tglLahir = Date.now,
//         jk = req.body.jk

//     let qry = `UPDATE user 
//     SET nama = '${nama}',
//     userName = '${userName}',
//     password = '${password}',
//     tglLahir = '${tglLahir}',
//     jk = '${jk}'
//      WHERE idUser = '${id}'`

//     connection.query(qry, (error, result) => {
//         if (error) {
//             console.log(error);
//         } else {
//             response.ok('Data berhasil diubah', res)
//             console.log(result.affectedRows, 'Data berhasil diubah');

//         }
//     })

// }



module.exports = {
    getAllData,
    addOneData,
    // deleteOneData,
    // editOneData

}