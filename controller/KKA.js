'use strict';
// let response = require('../res/res');
let connection = require('../config/connection');
const Joi = require('joi')
const moment = require('moment');
 

let getAllData = (req, res) => {

   let qry = 'SELECT * FROM listkka';
   connection.query(qry, (error, result, rows) => {
    if (error) {
        console.log(error);
    } else {
        response.ok(result, res)
      console.log(result);
    }
})

}


 let getbyName = (req, res) => {

    let nama = req.body.nama

    let qry = `SELECT * FROM listkka WHERE nama = "${nama}"`;
    connection.query(qry, (error, result, rows) => {
     if (error) {
         console.log(error);
     } else {
         response.ok(result, res)
       console.log(result);
     }
 })
 
 }


 let getbyArea = (req, res) => {

    let area = req.body.area

        let qry = `SELECT * FROM listkka WHERE area = "${area}"`;
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

 let{
    nama,
    area,
    ketua,
    noHPKetua,
    Pembimbing,
    noHPPembimbing,
    hari,
    jam,
    } = req.body


   if (nama.length == 0) {
            let ress = {
                status: '200',
                message: 'error',
                values:'field nama kosong'
            }

            res.send(ress);
            return;
        }


    if (area.length == 0) {
            let ress = {
                status: '200',
                message: 'error',
                values:'field area kosong'
            }

            res.send(ress);
            return;
        }

    if (ketua.length == 0) {
            let ress = {
                status: '200',
                message: 'error',
                values:'field ketua kosong'
            }

            res.send(ress);
            return;
        }


        if (noHPKetua.length == 0){

            let ress = {

                status: '200',
                message: 'error',
                values: 'field noHPKetua kosong'
            }

            res.send(ress);
            return;
            
        } else if (response.checknumber(noHPKetua)) {
            let ress = {

                status: '200',
                message: 'error',
                values: 'No HP Ketua Invalid, No HP bercampur alphanumeric / angka dan huruf'
            }
            res.send(ress);
            return;
        }

        if (Pembimbing.length == 0) {
            let ress = {
                status: '200',
                message: 'error',
                values: 'field Pembimbing kosong'
            }

            res.send(ress);
            return;
        }


        if (noHPPembimbing.length == 0){

            let ress = {
                status: '200',
                message: 'error',
                values: 'field noHP Pembimbing kosong'
            }

            res.send(ress);
            return;
            
        } else if (response.checknumber(noHPPembimbing)) {
            let ress = {

                status: '200',
                message: 'error',
                values: 'No HP Pembimbing Invalid, No HP bercampur alphanumeric / angka dan huruf'
            
            }
            res.send(ress);
            return;
        }


        
        if (hari.length == 0){

            let ress = {
                status: '200',
                message: 'error',
                values: 'field hari kosong'
            }

            res.send(ress);
            return;
            
        } 

        if (jam.length == 0){

            let ress = {

                status: '200',
                message: 'error',
                values: 'field jam kosong'
            }

            res.send(ress);
            return;
            
        } 

        


         try {
            let qry = `INSERT INTO listkka ( nama, area, ketua, noHPKetua, Pembimbing, noHPPembimbing, hari, jam,) 
            VALUES('${nama}', '${area}', '${ketua}', '${noHPKetua}', '${Pembimbing}', '${noHPPembimbing}', '${hari}', '${jam}')`
        
            connection.query(qry, (error, rows, result) => {
                if (error) {
                    console.log(error);
                } else {
                    response.ok(result, res)
                    console.log(`Data ${nama} berhasil ditambahkan`);
                 
                }
            })
         } catch (error) {
             console.log(error);
         } 
    
}


let deleteOneData = (req, res) => {
    let nama = req.body.nama

    let qry = `DELETE FROM listkka WHERE  nama = '${nama}'`

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
    getbyName,
    getbyArea,
    addOneData,
    deleteOneData

}