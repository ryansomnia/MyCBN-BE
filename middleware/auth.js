const connection = require('../config/connection');
const mysql = require('mysql2');
const md5 = require('md5');
const response = require('../res/res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');
const moment = require('moment');

let today = moment().format('YYYY-MM-DD');

exports.registrasi = function (req, res) {
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email,
        tglRegis: today,
        tglLahir: req.body.tglLahir,
        alamat: req.body.alamat,
        kka: req.body.KKA,
        noHP: req.body.noHP,
        jenisKelamin: req.body.jenisKelamin
    }

    let query = `SELECT email FROM user WHERE email = '${data.email}'`;

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 0) {
                let query = `INSERT INTO user (nama, userName, password, role, email, tglRegis, tglLahir, alamat, kka, noHP, jenisKelamin ) 
    VALUES('${data.nama}', '${data.username}', '${data.password}', '${data.role}', '${data.email}', '${data.tglRegis}', 
    '${data.tglLahir}',
    '${data.alamat}',
    '${data.kka}',
    '${data.noHP}',
    '${data.jenisKelamin}')`

                connection.query(query, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok("Berhasil menambahkan user", res)
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
    let query = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}' `;
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
                    noHP: rows[0].noHP,
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
                            noHP: data.noHP,
                            jenisKelamin: data.jenisKelamin


                        });
                    }

                });
            } 
           
            else {
                res.json({
                    "Error": true,
                    "Message": "Email atau password salah"
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