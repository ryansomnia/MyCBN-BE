'use strict';
let response = require('../res/res');
let connection = require('../config/connection');


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
let editOneData = (req, res) => {
    let id = req.body.id

    let nama = req.body.nama,
        userName = req.body.userName,
        password = req.body.password,
        tglLahir = Date.now,
        jk = req.body.jk

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
let done = (req, res) => {

    connection.query(`SELECT user.nama, schedule.book, schedule.chapterA, schedule.chapterB, schedule.date, agenda.status
    FROM agenda 
    JOIN user
    JOIN schedule
    WHERE agenda.idUser = user.idUser
    AND agenda.idSchedule = schedule.idSchedule
    AND agenda.status = 'done'`, (error, rows, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
            console.log(rows);
        }
    })

}


module.exports = {
    getAllData,
    done,
    addOneData,
    deleteOneData,
    editOneData

}