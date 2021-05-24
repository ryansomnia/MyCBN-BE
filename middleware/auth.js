const connection = require('../config/connection');
const mysql = require('mysql2');
const md5 = require('md5');
const response = require('../res/res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');
const moment = require('moment');
const Joi = require('joi');

let today = moment().format('YYYY-MM-DD');

exports.registrasi = function (req, res) {
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        tglRegis: today,
        tglLahir: req.body.tglLahir,
        alamat: req.body.alamat,
        kka: req.body.KKA,
        NoHP: req.body.NoHP,
        jenisKelamin: req.body.jenisKelamin
    }
    
        if (data.nama == ''  || data.nama.length == null) {
            let ress = {
                status: '200',
                message: 'error',
                values: 'nama tidak boleh kosong'
            }

            res.send(ress);
            return;
        } else if (data.nama.length >= 50){
            let ress = {
                status: '200',
                message: 'error',
                values: 'nama terlalu panjang, maksimal 50 karakter'
            }

            res.send(ress);
            return;
        }

        
        if (data.username == ''  || data.username.length == null) {
            let ress = {
                status: '200',
                message: 'error',
                values: 'username tidak boleh kosong'
            }

            res.send(ress);
            return;

        } else if (data.username.length >= 50){
            let ress = {
                status: '200',
                message: 'error',
                values: 'username terlalu panjang, maksimal 30 karakter'
            }

            res.send(ress);
            return;
        }

        
        if (data.password == ''  || data.password.length == null) {
            let ress = {
                status: '200',
                message: 'error',
                values: 'password tidak boleh kosong'
            }

            res.send(ress);
            return;

        } else if (data.password.length >= 30){
            let ress = {
                status: '200',
                message: 'error',
                values: 'password terlalu panjang, maksimal 30 karakter'
            }

            res.send(ress);
            return;
        }
        

        if (response.validateEmail(data.email)) {
            let ress = {
                
                status: '200',
                message: 'error',
                values: 'email Invalid, email format tidak sesuai'
            }
            res.send(ress);
            return;
        }  else if (data.email == ''  || data.email.length == null) {
            let ress = {
                status: '200',
                message: 'error',
                values: 'email tidak boleh kosong'
            }

            res.send(ress);
            return;

        } else if (data.email.length >= 30){
            let ress = {
                status: '200',
                message: 'error',
                values: 'email terlalu panjang, maksimal 30 karakter'
            }

            res.send(ress);
            return;
        }

        
        if (data.tglLahir == ''  || data.tglLahir.length == null) {
            let ress = {
                status: '200',
                message: 'error',
                values: 'tglLahir tidak boleh kosong'
            }

            res.send(ress);
            return;

        }


        if (data.alamat == ''  || data.alamat.length == null) {
            let ress = {
                status: '200',
                message: 'error',
                values: 'alamat tidak boleh kosong'
            }

            res.send(ress);
            return;

        }

        if (data.NoHP == ''  || data.NoHP == null) {
            let ress = {
                status: '200',
                message: 'error',
                values: 'NoHP tidak boleh kosong'
            }

            res.send(ress);
            return;

        } else if (data.NoHP.length >= 15){
            let ress = {
                status: '200',
                message: 'error',
                values: 'NoHP terlalu panjang, maksimal 15 karakter'
            }

            res.send(ress);
            return;

        } else if (response.checknumber(data.NoHP)){
            let ress = {
                status: '200',
                message: 'error',
                values: 'No HP Invalid, No HP bercampur alphanumeric / angka dan huruf'
            }
            res.send(ress);
            return;
        }
        
        if (data.jenisKelamin == ''  || data.jenisKelamin.length == null) {
            let ress = {
                status: '200',
                message: 'error',
                values: 'jenisKelamin tidak boleh kosong'
            }

            res.send(ress);
            return;
        }


    let query = `SELECT email FROM user WHERE email = '${data.email}'`;

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
         } else {
            if (rows.length == 0) {
                let qry = `INSERT INTO user (nama, userName, password, role, email, tglRegis, tglLahir, alamat, kka, NoHP, jenisKelamin ) 
    VALUES('${data.nama}', '${data.username}', '${md5(data.password)}', 'user', '${data.email}', '${data.tglRegis}', 
            '${data.tglLahir}','${data.alamat}', '${data.kka}', '${data.NoHP}', '${data.jenisKelamin}')`

                connection.query(qry, function (error, rows) {
                    if (error) {
                        console.log(error);
                     
                    } else {
                        response.ok("Berhasil menambahkan user", res)
                        console.log("Berhasil menambahkan user");
                    }

                })
            } else {
                 response.ok("Email sudah terdaftar", res);
            }
        }
    })
}


//controller untuk login

exports.login = function (req, res) {
    let {
        email,
        password,
    } = req.body;

    if (email == ''  || email.length == null) {
        let ress = {
            status: '200',
            message: 'error',
            values: 'email tidak boleh kosong'
        }

        res.send(ress);
        return;

    }

    if (password == ''  || password.length == null) {
        let ress = {
            status: '200',
            message: 'error',
            values: 'password tidak boleh kosong'
        }

        res.send(ress);
        return;

    }


    let query = `SELECT * FROM user WHERE email = '${email}' AND password = '${md5(password)}' `;
    console.log(password);
    console.log(query);
    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 1) {
                let token = jwt.sign({ rows }, config.secret, {
                    expiresIn: Math.floor(new Date() / 1000)
                });
                let data = {
                    idUser: rows[0].idUser,
                    nama: rows[0].nama,
                    accessToken: token,
                    ipAddress: ip.address(),
                    username: rows[0].username,
                    role: rows[0].role,
                    email: rows[0].email,
                    tglLahir: rows[0].tglLahir,
                    alamat: rows[0].alamat,
                    kka: rows[0].KKA,
                    NoHP: rows[0].NoHP,
                    jenisKelamin: rows[0].jenisKelamin

                }

                let query = `INSERT INTO aksestoken(idUser, accessToken, ipAddress)
    VALUES('${data.idUser}', '${data.accessToken}', '${data.ipAddress}'); `

                connection.query(query, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                            success: true,
                            message: "Token JWT tergernerate !",
                            token: token,
                            currUser: data.idUser,
                            nama: data.nama,
                            username: data.username,
                            role: data.role,
                            email: data.email,
                            tglLahir: data.tglLahir,
                            alamat: data.alamat,
                            kka: data.kka,
                            NoHP: data.NoHP,
                            jenisKelamin: data.jenisKelamin


                        });
                    }

                });
            } 
           
            else {
                res.json({
                    status: '200',
                    message: 'error',
                    values: 'Email atau password salah'
                });
            }
        }

    });
}

exports.halamanrahasia = function (req, res) {

    response.ok("Halaman ini hanya untuk user dengan role = User", res)

}
exports.halamanAdmin = function (req, res) {

    response.ok("Halaman ini hanya untuk user dengan role = Admin", res)

}