'use strict';

const connection = require('../config/MySQL');
let dotenv = require('dotenv');
let env = dotenv.config();

let checknumber = (data) => {
  let reg = new RegExp("^[0-9]+$");
  if (!reg.test(data)) {
    return true;
  } else {
    return false;
  }
};

let pastoral = {
    permohonanDoa : async(req, res) => {

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

         
        try {
      
          
            let qryOTP = `INSERT INTO otp (idRegis, email, otp, status) VALUES (${idReg},'${email}','${OTP}',0)`;
            let hasilx = await connection.execQry(qryOTP)

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
    // router.post('/cbn/v1/pastoral/permohonanDoa', pastoral.registrasi);
    // router.post('/cbn/v1/pastoral/pelayananKematian', pastoral.getbyUser);
    // router.post('/cbn/v1/pastoral/pelayananPernikahan', pastoral.getbyUser);
    // router.post('/cbn/v1/pastoral/pelayananBaptisan', pastoral.getbyUser);
    // router.post('/cbn/v1/pastoral/pelayananPenyerahanAnak', pastoral.getbyUser);
    // router.post('/cbn/v1/pastoral/pelayananKonseling', pastoral.getbyUser);
    }

module.exports = pastoral;