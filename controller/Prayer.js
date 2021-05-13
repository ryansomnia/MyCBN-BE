'use strict';
let response = require('../res/res');
let connection = require('../config/connection');
const Joi = require('joi')
const moment = require('moment');
 

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

 let{
    nama,
    noHP ,
    isiDoa
    } = req.body


   if (nama.length == 0) {
            let ress = {
                status: 'error',
                error: 'data nama kosong',
            }

            res.send(ress);
            return;
        }


    if (noHP.length == 0) {
            let ress = {
                status: 'error',
                error: 'data nomor HP kosong',
            }

            res.send(ress);
            return;
        }
        
    if (response.checknumber(noHP)) {
            let ress = {
                status: 'error',
                error: 'No HP Invalid, No HP bercampur alphanumeric / angka dan huruf',
            }
            res.send(ress);
            return;
        }
    if (isiDoa.length == 0) {
            let ress = {
                status: 'error',
                error: 'isi doa kosong',
            }

            res.send(ress);
            return;
        }

let waktuRequest = moment().format("YYYY-MM-DD")


         try {
            let qry = `INSERT INTO listdoa (nama, noHP, waktuRequest, isiDoa) 
            VALUES('${nama}', '${noHP}', '${waktuRequest}', '${isiDoa}')`
        
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