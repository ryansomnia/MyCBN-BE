'use strict';
const response = require('../res/res');
const connection = require('../config/connection');
const nodemailer = require('nodemailer');



// send email
// kenapa cron??

 let sendEmailverivikasiAkun = (req, res) => {
     let email = req.body.email
    // let query = `SELECT email FROM user WHERE verify = '2' LIMIT 1 `;
    // 1 = sukses
    // 2 = pending
//    connection.query(query, (error, rows, result) => {
        // if (error) {
        //     console.log(error);
        // } else {
            if (email.length > 0) {

                // let email =  rows[0].email;
                let link = { 
                    dev :`https://bemycbn.herokuapp.com/updateVerivikasiAkun/${email}`,
                    local : `http://localhost:5000/updateVerivikasiAkun/${email}`
            }

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'laskarimmanuel@gmail.com',
                        pass: 'sitorus2371'
                    }
                });
                
                var mailOptions = {
                    from: 'laskarimmanuel@gmail.com',
                    to: `${email}`,
                    subject: 'Verivikasi email',
                    text: `silahkan klik link ini untuk validasi akun anda ${link.local}`
                   
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) throw err;
                    console.log('Email terkirim: ' + info.response);
                });
                // response.ok('Data berhasil diubah', res)
               
                
                // let update = `UPDATE user 
                // SET verify = '1',
                //  WHERE idUser = '${}'`
            }
        //   console.log(result);
        }
    // })
//   }
  
  let updateVerivikasiAkun = (req, res) => {
    let email = req.params.email
console.log(email);
    let qry = `UPDATE user 
    SET verify = '1'
     WHERE email = '${email}'`
console.log(qry);
    connection.query(qry, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            response.ok('Data berhasil diubah', res)
            console.log(result.affectedRows, 'Data berhasil diubah');

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

            if (nama.length == 0) {
                let ress = {
                    status: 'error',
                    error: 'data nama kosong',
                }

                res.send(ress);
                return;
            }

            if (userName.length == 0) {
                    let ress = {
                        status: 'error',
                        error: 'data userName kosong',
                    }

                    res.send(ress);
                    return;
            } else if (userName.length > 4) {
                    let ress = {
                        status: 'error',
                        error: 'data username harus lebih dari 4 karakter',
                    }

                    res.send(ress);
                    return;

            }
        

        if (password.length == 0) {
                let ress = {
                    status: 'error',
                    error: 'data password kosong',
                }

                res.send(ress);
                return;
         } else if (password.length > 8) {
                let ress = {
                    status: 'error',
                    error: 'password harus lebih dari 8 karakter',
                }

                res.send(ress);
                return;

        }






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
 

// let verivikasiAkun = function (req, res) {
//     let email = req.body.email
    

//     let query = `SELECT * FROM user WHERE email = '${email}'`;

// if valid = pending 
// maka kirim email verivikasi 


//     connection.query(query, function (error, rows) {
//         if (error) {
//             console.log(error);
//          } else {
//             if (rows.length == 0) {
//                 let qry = `INSERT INTO user (nama, userName, password, role, email, tglRegis, tglLahir, alamat, kka, NoHP, jenisKelamin ) 
//     VALUES('${data.nama}', '${data.username}', '${data.password}', 'user', '${data.email}', '${data.tglRegis}', 
//             '${data.tglLahir}','${data.alamat}', '${data.kka}', '${data.NoHP}', '${data.jenisKelamin}')`

//                 connection.query(qry, function (error, rows) {
//                     if (error) {
//                         console.log(error);
                     
//                     } else {
//                         response.ok("Berhasil menambahkan user", res)
//                         console.log("Berhasil menambahkan user");
//                     }

//                 })
//             } else {
//                  response.ok("Email sudah terdaftar", res);
//             }
//         }
//     })
// }

module.exports = {
    getAllData,
    addOneData,
    deleteOneData,
    selectOneUser,
    editOneUser,
    sendEmailverivikasiAkun,
    updateVerivikasiAkun

}