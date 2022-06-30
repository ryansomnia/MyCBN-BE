const connection = require('../config/MySQL');
let dotenv = require('dotenv');
let env = dotenv.config();
const moment = require('moment');

let checknumber = (data) => {
  let reg = new RegExp("^[0-9]+$");
  if (!reg.test(data)) {
    return true;
  } else {
    return false;
  }
};

let KKA = {
    getListKKA : async(req, res) =>{
        try {
            let qry = 'SELECT * FROM kka';
            let hasil = await connection.execQry(qry)
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
    // createDataKKA : async(req, res)=>{

    // },
    registrasiKKA : async(req, res) => {

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


        let namaLengkap = req.body.namaLengkap
        
        if (namaLengkap == 0 || namaLengkap == null) {

          let response = {
              code: 400,
              message: 'Error',
              error:'Nama Lengkap tidak terisi'
            };
          
    
          res.status(400).send(response);
          return response;
        } 

        let noHP = req.body.noHP
        if (noHP == 0 || noHP == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'Nomor handphone tidak terisi'
              };
            
      
            res.status(400).send(response);
            return response;
          } 

          if (checknumber(noHP)) {
            let response =
            {
              code: 400,
              message: 'Error',
              error:'Nomor Handphone harus numerik'
            }
            res.status(400).send(response);
            return response;
          } 

        let usia = req.body.usia
        if (usia == 0 || usia == null) {

          let response = {
              code: 400,
              message: 'Error',
              error:'usia tidak terisi'
            };
          
    
          res.status(400).send(response);
          return response;
        } 
        if (checknumber(usia)) {
          let response =
          {
            code: 400,
            message: 'Error',
            error:'Usia harus numerik'
          }
          res.status(400).send(response);
          return response;
        } 

        let statusPernikahan = req.body.statusPernikahan
        if (statusPernikahan == 0 || statusPernikahan == null) {

          let response = {
              code: 400,
              message: 'Error',
              error:'status Pernikahan tidak terisi'
            };
          
    
          res.status(400).send(response);
          return response;
        } 


        let wilayah = req.body.wilayah

        if (wilayah == 0 || wilayah == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'Wilayah tidak terisi'
              };
            
      
            res.status(400).send(response);
            return response;
          } 

        let codeKKA = req.body.codeKKA
        if (codeKKA == 0 || codeKKA == null) {

          let response = {
              code: 400,
              message: 'Error',
              error:'pilihan KKA tidak terisi'
            };
          
    
          res.status(400).send(response);
          return response;
        } 

    
       
        try {
            let qry = `CALL registerMemberKKA('${username}','${namaLengkap}', '${noHP}', '${usia}', '${statusPernikahan}', '${wilayah}', '${codeKKA}')`;
            let hasil = await connection.execSP(qry)

              if (hasil.code === 200){
                    let response = {
                        code: 200,
                        message: 'success',
                        description: ` Selamat ${namaLengkap} telah mau bergabung dengan KKA, mohon menunggu beberapa waktu kedepan untuk di follow up keta KKA mu`
                    };
                    

            console.log(response)
            res.status(200).send(response)

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
    
    
    
    }
    }

module.exports = KKA;