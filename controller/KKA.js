const connection = require('../config/MySQL');
const timeSetting = require('../helpers/timeSetting');
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
    getCode : async(req, res)=>{
      try {
          let dateNow = timeSetting.getCurrentTime()
          let username = req.body.username
          let persembahanGereja = req.body.persembahanGereja
          let kasKKA = req.body.kasKKA
        let qry = `SELECT a.username, a.fullName, b.codeKKA, b.nama, 
        b.wilayah
         FROM user a
        INNER JOIN kka b ON a.codeKKA = b.codeKKA
        WHERE a.username = '${username}'`;

        let hasil = await connection.execQry(qry)
console.log(hasil);

        let insertQry = `INSERT INTO kkaReport (codeKKA, waktu, tempat, persembahanGereja, kasKKA)
        VALUES ('${hasil[0].codeKKA}', '${hasil[0].dateNow}', '${hasil[0].wialyah}', '${hasil[0].persembahanGereja}', ${hasil[0].kasKKA})`
        
        let hasilInsert = await connection.execQry(insertQry);
        
        console.log(hasilInsert);
        //  let response = {
          //   code: 200,
          //   message: 'success',
          //   data: hasil
          // };
  //        console.log(response)
          res.status(200).send(response)
    return hasil
    } catch (error) {
  //     console.log(error);
  //     let response = {
  //         code: hasil.code,
  //         message: hasil.message,
  //         error:error
  //       };
  //       res.status(400).send(response)
  }},
    submitCode: async(req,res) =>{
      try {

        let username = req.body.username;
        let fullName = req.body.fullName;
        let namaKKA = req.body.namaKKA;
        let qry = 'INSERT INTO';
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