'use strict';
let response = require('../res/res');
let connection = require('../config/connection');

// send email
function sendEmail(res) {
    let qry = 'SELECT * FROM user';
   connection.query(qry, (error, result) => {
        if (error) {
            console.log(error);
        } else {
          console.log(result);
        }
    })
  }
  

let getAllData = (req, res) => {

   let qry = 'SELECT * FROM user';
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
    let { nama, 
        userName, 
        password, 
        role,
    email,
tglLahir,
alamat,
KKA,
NoHP,
jenisKelamin,
image} = req.body 



    let tglRegis = Date.now
    

    let qry = `INSERT INTO user (nama, userName, password, role, email, tglRegis, tglLahir, alamat, KKA, noHP, jenis Kelamin, image) 
    VALUES('${nama}', '${userName}', '${password}', '${role}','${email}', '${tglRegis}', '${tglLahir}', '${alamat}', '${KKA}','${NoHP}', '${jenisKelamin}' '${image}')`

    connection.query(qry, (error, rows, result) => {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
            console.log('Data berhasil ditambahkan');
        }
    })

}
let deleteOneData = (req, res) => {
    let id = req.body.id

    let qry = `DELETE FROM user WHERE userName = '${id}'`

    connection.query(qry, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            response.ok('Data berhasil terhapus', res)
            console.log(result.affectedRows, 'Data berhasil terhapus');

        }
    })

}
let selectOneUser = (req, res) => {
    let idUser = req.body.idUser

let show = `SELECT * FROM user WHERE idUser = '${idUser}'`;
connection.query(show, (error, result, rows) => {
    if (error) {
        console.log(error);
    } else {
        response.ok(result, res)
      console.log(result);
    }
})
}
let editOneUser = (req, res) => {
let { 
    idUser,
    nama, 
    password, 
email,
tglLahir,
alamat,
NoHP,
jenisKelamin,
image} = req.body 

    let qry = `UPDATE user 
    SET nama = '${nama}',
    password = '${password}',
    email = '${email}',
    tglLahir = '${tglLahir}',
    alamat = '${alamat}',
    NoHP = '${NoHP}',
    jenisKelamin = '${jenisKelamin}'
    image = '${image}'
     WHERE idUser = '${idUser}'`

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
    addOneData,
    deleteOneData,
    selectOneUser,
    editOneUser,
    sendEmail

}