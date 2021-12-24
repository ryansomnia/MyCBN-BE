'use strict';
const response = require('../res/res');
const connection = require('../config/connection');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')
let dotenv = require('dotenv');
let env = dotenv.config();
const moment = require('moment');

var rn = require('random-number');

let checknumber = (data) => {
  let reg = new RegExp("^[0-9]+$");
  if (!reg.test(data)) {
    return true;
  } else {
    return false;
  }
};

let user = {
    registrasi : async(req, res) => {

        let username = req.body.username
       
        if (username == 0 || username == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'username tidak terisi'
              };
            
      
            res.status(400).send(response);
            return response;
          } 


        let password = req.body.password
        let reTypePass = req.body.reTypePass

        if (password == 0 || password == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'password tidak terisi'
              };
            
      
            res.status(400).send(response);
            return response;
          } 

          
          if (reTypePass == 0 || reTypePass == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'confirmasi Password tidak terisi'
              };
            
      
            res.status(400).send(response);
            return response;
          } 

          if (password != reTypePass) {
            let response =
            {
              code: 400,
              message: 'Error',
              error:'Password Konfirmasi harus sama'
            }
            res.status(400).send(response);
            return response;
          }

          // let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
          // if (!strongRegex.test(password)) {

          //   let response = {
          //     code: 400,
          //     message: 'Error',
          //     error:'Password harus terdiri dari kombinasi huruf besar, huruf kecil, angka, symbol(!@#$%^&*) dan lebih dari 8 karakter'
          //   };
          //   res.status(400).send(response);
          //   return response;
          // }

        let fullName = req.body.fullName

        if (fullName == 0 || fullName == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'Nama Lengkap tidak terisi'
              };
            
      
            res.status(400).send(response);
            return response;
          } 

        let sex = req.body.sex

        if (sex == 0 || sex == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'Jenis Kelamin tidak terisi'
              };
            
      
            res.status(400).send(response);
            return response;
          } 


        let address = req.body.address

        if (address == 0 || address == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'Alamat tidak terisi'
              };
            
      
            res.status(400).send(response);
            return response;
          } 

        let email = req.body.email

        if (email == 0 || email == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'email tidak terisi'
              };
            
      
            res.status(400).send(response);
            return response;
          } 

          let emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          if (!emailRegexp.test(email)) {
         
            let response = {
              code: 400,
              message: 'Error',
              error:'format email salah'
            };
            res.status(400).send(response);
            return response;
          }


        let handphone = req.body.handphone

        if (handphone == 0 || handphone == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'Nomor handphone tidak terisi'
              };
            
      
            res.status(400).send(response);
            return response;
          } 

          if (checknumber(handphone)) {
            let response =
            {
              code: 400,
              message: 'Error',
              error:'Nomor Handphone harus numerik'
            }
            res.status(400).send(response);
            return response;
          } 

          let date = moment(Date.now()).format('DD')
     
          var val = Math.floor(100 + Math.random() * 900);
        console.log(val);
          let idReg = `${date}${val}`
          console.log(idReg);
        try {
            let qry = `CALL register('${idReg}','${username}', '${password}', '${fullName}', '${sex}', '${address}', '${email}', '${handphone}')`;
            let hasil = await connection.execSP(qry)

            var OTP = Math.floor(1000 + Math.random() * 9000);
            let qryOTP = `INSERT INTO otp (idRegis, email, otp, status) VALUES ('${idReg}','${email}','${OTP}',0)`;
            let hasilx = await connection.execQry(qryOTP)
console.log("que",hasilx);
              if (hasil.code === 200){
                    let response = {
                        code: 200,
                        message: 'success',
                        data: {
                            username : username,
                            email: email,
                            handphone : handphone
                        }
                    };
                    

            console.log(response)
            res.status(200).send(response)
            await user.otpMailConfirmation(email,OTP)
              } else {
                        let error = {
                          code: hasil.code,
                          message: hasil.message,
                          error: hasil.error
                      };
          console.log(error) 
          res.status(400).send(error)
       return error
              }

        } catch (error) {
               

                        let response = {
                        code: hasil.code,
                        message: hasil.message,
                        error:error
                      };
              console.log(response);
              res.status(400).send(response)
              return response
        }
    },
    getAllData : async(req, res) =>{




        try {
            let qry = 'SELECT * FROM user';
            let hasil = await connection.execSP(qry)
           
            //    console.log(hasil);
               let response = {
                code: 200,
                message: 'success',
                data: hasil
              };
             console.log(response)
              res.status(200).send(response)
        return hasil
        } catch (error) {
            console.log(error);
            let response = {
                code: hasil.code,
                message: hasil.message,
                error:error
              };
              res.status(400).send(response)
        }
    },
    deleteAccount : async (req, res) => {
      let username = req.body.username
           
      if (username == 0 || username == null) {
    
          let response = {
              code: 400,
              message: 'Error',
              error:'username tidak terisi'
            };
          
    
          res.status(400).send(response);
          return response;
        } 
    
    
       
        try {
          let qry = `DELETE FROM user WHERE username = '${username}'`
          let hasil = await connection.execSP(qry)
      console.log(hasil)
            // if (hasil.code == 200){
                  let response = {
                      code: 200,
                      message: 'success',
                      description:`data ${username} sudah berhasil dihapus`
                  };
    
          console.log(response)
          res.status(200).send(response)
          return response
    
            // } else {
            //           let error = {
            //             code: hasil.code,
            //             message: hasil.message,
            //             error: hasil.error
            //         };
        // console.log(error) 
        // res.status(200).send(error)
        // return error 
        //     }
    
      } catch (error) {
             
    
                      let response = {
                      code: hasil.code,
                      message: hasil.message,
                      error:error
                    };
            console.log(response);
            res.status(400).send(response)
            return response
      }
      
    
    },
    otpMailConfirmation : (email, otp) => {
     
      try{
     
        let transporter = nodemailer.createTransport({
                             service: 'gmail',
                              auth: {
                                  user: process.env.core_email,
                                  pass: process.env.core_pw_email
                              },
                              port: 465,
                              secure: true
                });
                
            
                var mailOptions = {
                    from: process.env.core_email,
                    to: email,
                    subject: 'Verivikasi email',
                    text: `Sliahkan input ${otp} untuk kode OTP `
                   
                };

              transporter.sendMail(mailOptions, (err, info) => {
console.log(mailOptions);
              if (err) {
                let error = {
                  code: 400,
                  message: 'Error',
                  error: err
                };
                console.log(error) 
                return error;
                
              } else {
                let success = {
                  code: 200,
                  message: 'Success',
                  success: 'Email terkirim: ' + info.response
                };
                console.log(success) 
                return success;
            
              }

                });


    } catch (error) {
               

      let response = {
      code: hasil.code,
      message: hasil.message,
      error:error
    };
    console.log(response);
    res.status(400).send(response)
    }
      },
    ValidateAccount : async(req, res ) => {
      let idRegis = req.body.idRegis
      let otp = req.body.otp
      if (otp == 0 || otp == null) {

        let response = {
            code: 400,
            message: 'Error',
            error:'otp tidak terisi'
          };
        
  
        res.status(400).send(response);
        return response;
      } 
      if (idRegis == 0 || idRegis == null) {

        let response = {
            code: 400,
            message: 'Error',
            error:'idRegis tidak terisi'
          };
        
  
        res.status(400).send(response);
        return response;
      } 

      try {
        let qry = `CALL validateAccount ('${idRegis}', '${otp}')`
        
        let hasil = await connection.execSP(qry)

        console.log(hasil);

        if (hasil.code === 200){
          let response = {
              code: 200,
              message: 'success',
              description: 'OTP Valid'
          };
              console.log(response)
              res.status(200).send(response)
              return response

        } else {
              let response = {
                code: hasil.code,
                message: hasil.message,
                error: hasil.description
            };
                console.log(response) 
                res.status(400).send(response)
                return response
    }
      } catch (err) {
            let response = {
              code: 500,
              message: error,
              error:err
            };
                console.log(response);
                res.status(400).send(response)
                return response

          }
      } 
    }




// send email
// kenapa cron??

//  let sendEmailverivikasiAkun = (req, res) => {
//      let email = req.body.email
//     let query = `SELECT email FROM user WHERE verify = '2' LIMIT 1 `;
//     1 = sukses
//     2 = pending
// //    connection.query(query, (error, rows, result) => {
//         // if (error) {
//         //     console.log(error);
//         // } else {
//             if (email.length > 0) {

//                 // let email =  rows[0].email;
//                 let link = { 
//                     dev :`${process.env.link_dev}/${email}`,
//                     local : `${process.env.link_local}/${email}`
//             }

//                 let transporter = nodemailer.createTransport({
//                     service: 'gmail',
//                     auth: {
//                         user: process.env.core_email,
//                         pass: process.env.core_pw_email
//                     }
//                 });
                
//                 var mailOptions = {
//                     from: process.env.core_email,
//                     to: `${email}`,
//                     subject: 'Verivikasi email',
//                     text: `silahkan klik link ini untuk validasi akun anda ${link.local}`
                   
//                 };

//                 transporter.sendMail(mailOptions, (err, info) => {
//                     if (err) throw err;
//                     console.log('Email terkirim: ' + info.response);
//                 });
                // response.ok('Data berhasil diubah', res)
               
                
                // let update = `UPDATE user 
                // SET verify = '1',
                //  WHERE idUser = '${}'`
  //           }
  //       //   console.log(result);
  //       }
  //   })
  // }
  
//   let updateVerivikasiAkun = (req, res) => {
//     let email = req.params.email
// console.log(email);
//     let qry = `UPDATE user 
//     SET verify = '1'
//      WHERE email = '${email}'`
// console.log(qry);
//     connection.query(qry, (error, result) => {
//         if (error) {
//             console.log(error);
//         } else {
//             response.ok('Data berhasil diubah', res)
//             console.log(result.affectedRows, 'Data berhasil diubah');

//         }
//     })

// }

// let sendOTP = (req, res) => {
    // let email = req.body.email
   // let query = `SELECT email FROM user WHERE verify = '2' LIMIT 1 `;
   // 1 = sukses
   // 2 = pending
//    connection.query(query, (error, rows, result) => {
       // if (error) {
       //     console.log(error);
       // } else {
        //    if (email.length > 0) {

               // let email =  rows[0].email;
        //        let link = { 
        //            dev :`https://bemycbn.herokuapp.com/updateVerivikasiAkun/${email}`,
        //            local : `http://localhost:5000/updateVerivikasiAkun/${email}`
        //    }
//                 let OTP = otpGenerator.generate(4, { upperCase: true, specialChars: false });
//  console.log(OTP);
//                let transporter = nodemailer.createTransport({
//                    service: 'gmail',
//                    auth: {
//                        user: 'mycbngppk@gmail.com',
//                        pass: 'mycbn5000'
//                    }
//                });
               
            //    var mailOptions = {
            //        from: 'mycbngppk@gmail.com',
            //        to: `${email}`,
            //        subject: 'Verivikasi OTP',
            //        text: `Kode OTP adalah : ${OTP}`
                  
            //    };

            //    transporter.sendMail(mailOptions, (err, info) => {
    
            //        if (err) {
            //            console.log(err);
            //        } else {
            //            res.send(info)
            //         console.log('Email terkirim: ' + info.response);
            //        }
                   
            //    });
               // response.ok('Data berhasil diubah', res)
              
               
               // let update = `UPDATE user 
               // SET verify = '1',
               //  WHERE idUser = '${}'`
        //    }
       //   console.log(result);
    //    }
   // })
//   } 

// let getAllData = (req, res) => {

//    let qry = 'SELECT * FROM user';
//    connection.query(qry, (error, result, rows) => {
//     if (error) {
//         console.log(error);
//     } else {
//         response.ok(result, res)
//       console.log(result);
//     }
// })

// }



// let selectOneUser = (req, res) => {
//     let idUser = req.body.idUser

// let show = `SELECT * FROM user WHERE idUser = '${idUser}'`;
// connection.query(show, (error, result, rows) => {
//     if (error) {
//         console.log(error);
//     } else {
//         response.ok(result, res)
//       console.log(result);
//     }
// })
// }
// let editOneUser = (req, res) => {
//         let { 
//             idUser,
//             nama, 
//             password, 
//         email,
//         tglLahir,
//         alamat,
//         NoHP,
//         jenisKelamin,
//         image} = req.body 

//                 let qry = `UPDATE user 
//                 SET nama = '${nama}',
//                 password = '${password}',
//                 email = '${email}',
//                 tglLahir = '${tglLahir}',
//                 alamat = '${alamat}',
//                 NoHP = '${NoHP}',
//                 jenisKelamin = '${jenisKelamin}'
//                 image = '${image}'
//                 WHERE idUser = '${idUser}'`

//     connection.query(qry, (error, result) => {
//         if (error) {
//             console.log(error);
//         } else {
//             response.ok('Data berhasil diubah', res)
//             console.log(result.affectedRows, 'Data berhasil diubah');

//         }
//     })

// }
 

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

module.exports = user;