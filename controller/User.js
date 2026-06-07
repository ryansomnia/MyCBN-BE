"use strict";

const connection = require("../config/MySQL");
let dotenv = require("dotenv");
let env = dotenv.config();
const moment = require("moment");
const jwt = require("jsonwebtoken");
const path = require("path");

let checknumber = (data) => {
  let reg = new RegExp("^[0-9]+$");
  if (!reg.test(data)) {
    return true;
  } else {
    return false;
  }
};

let user = {
  registrasi: async (req, res) => {
    let username = req.body.username;

    if (username == 0 || username == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "username tidak terisi",
      };

      res.status(400).send(response);
      return response;
    }

    let password = req.body.password;
    let reTypePass = req.body.reTypePass;

    if (password == 0 || password == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "password tidak terisi",
      };

      res.status(400).send(response);
      return response;
    }

    if (reTypePass == 0 || reTypePass == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "confirmasi Password tidak terisi",
      };

      res.status(400).send(response);
      return response;
    }

    if (password != reTypePass) {
      let response = {
        code: 400,
        message: "Error",
        error: "Password Konfirmasi harus sama",
      };
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

    let fullName = req.body.fullName;

    if (fullName == 0 || fullName == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Nama Lengkap tidak terisi",
      };

      res.status(400).send(response);
      return response;
    }

    // let sex = req.body.sex;

    // if (sex == 0 || sex == null) {
    //   let response = {
    //     code: 400,
    //     message: "Error",
    //     error: "Jenis Kelamin tidak terisi",
    //   };

    //   res.status(400).send(response);
    //   return response;
    // }

    // let address = req.body.address;

    // if (address == 0 || address == null) {
    //   let response = {
    //     code: 400,
    //     message: "Error",
    //     error: "Alamat tidak terisi",
    //   };

    //   res.status(400).send(response);
    //   return response;
    // }

    let email = req.body.email;

    if (email == 0 || email == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "email tidak terisi",
      };

      res.status(400).send(response);
      return response;
    }

    let emailRegexp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegexp.test(email)) {
      let response = {
        code: 400,
        message: "Error",
        error: "format email salah",
      };
      res.status(400).send(response);
      return response;
    }

    let handphone = req.body.handphone;

    if (handphone == 0 || handphone == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Nomor handphone tidak terisi",
      };

      res.status(400).send(response);
      return response;
    }

    if (checknumber(handphone)) {
      let response = {
        code: 400,
        message: "Error",
        error: "Nomor Handphone harus numerik",
      };
      res.status(400).send(response);
      return response;
    }

    let date = moment(Date.now()).format("DD");
    var val = Math.floor(100 + Math.random() * 900);
    let idReg = `${date}${val}`;
    // let image = req.files.image;
    // let filesize = image.size;

    // let ext = path.extname(image.name);
    // let filename = image.md5 + ext;
    // const url = `${req.protocol}://${req.get("host")}/images/${filename}`;

    // let allowedType = [".png", ".jpg", ".jpeg"];

    // if (!allowedType.includes(ext.toLowerCase())) {
    //   return res.status(422).json({ msg: "invalid Image" });
    // }
    // if (filesize > 5000000) {
    //   return res.status(422).json({ msg: " Size overload" });
    // }
    // if (image == 0 || image == null) {
    //   let response = {
    //     code: 400,
    //     message: "Error",
    //     error: "articleImage   tidak terisi",
    //   };
    //   res.status(400).send(response);
    //   return response;
    // }

    // image.mv(`./public/profile/${filename}`, async (err) => {
    //   if (err) {
    //     return res.status(500).json({ msg: err.message });
    //   }

      try {
        let qry = `CALL register('${idReg}', '${fullName}', '${username}', '${password}', '${email}', '${handphone}')`;
        let hasil = await connection.execSP(qry);
        if (hasil.code === 200) {
          let response = {
            code: 200,
            message: "success",
            data: {
              username: username,
              email: email,
              handphone: handphone,
            },
          };

          console.log(response);
          res.status(200).send(response);
        } else {
          let error = {
            code: hasil.code,
            status:hasil.error,
            message: hasil.message
          };
          console.log(error);
          res.status(error.code).send(error);
          return error;
        }
      } catch (err) {
        let response = {
          code: 500,
          status:'error',
          message: 'Internal Server Error',
          detail: err.message,
        };
        console.log(response);
        res.status(response.code).send(response);
        return response;
      }
    // });
  },
  getAllData: async (req, res) => {
    try {
      let qry = "SELECT * FROM user";
      let hasil = await connection.execQry(qry);

      console.log(hasil);
      let response = {
        code: 200,
        message: "success",
        data: hasil,
      };
      console.log(response);
      res.status(200).send(response);
      return hasil;
    } catch (error) {
      console.log(error);
      let response = {
        code: hasil.code,
        message: hasil.message,
        error: error,
      };
      res.status(400).send(response);
    }
  },
  deleteAccount: async (req, res) => {
    let username = req.body.username;

    if (username == 0 || username == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "username tidak terisi",
      };

      res.status(400).send(response);
      return response;
    }

    try {
      let qry = `DELETE FROM user WHERE username = '${username}'`;
      let hasil = await connection.execSP(qry);
      console.log(hasil);
      // if (hasil.code == 200){
      let response = {
        code: 200,
        message: "success",
        description: `data ${username} sudah berhasil dihapus`,
      };

      console.log(response);
      res.status(200).send(response);
      return response;

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
        error: error,
      };
      console.log(response);
      res.status(400).send(response);
      return response;
    }
  },
  login: async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username == 0 || username == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "username tidak terisi",
      };

      res.status(400).send(response);
      return response;
    }
    if (password == 0 || password == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "password tidak terisi",
      };

      res.status(400).send(response);
      return response;
    }

    try {
      let qry = `CALL login ('${username}', '${password}')`;

      let hasil = await connection.execSP(qry);
      console.log(hasil);
      if (hasil.code === 200) {
        let token = jwt.sign({ hasil }, process.env.SECRET_KEY, {
          expiresIn: Math.floor(new Date() / 1000),
          algorithm: "HS256",
        });

        let qry = `SELECT * FROM user WHERE username = '${username}'`;
        let dataUser = await connection.execQry(qry);
        console.log("dataUser", dataUser);
        let response = {
          code: 200,
          message: hasil.message,
          data: {
            username: dataUser[0].username,
            fullName: dataUser[0].fullName,
            sex: dataUser[0].sex,
            role: dataUser[0].role,
            address: dataUser[0].address,
            email: dataUser[0].email,
            handphone: dataUser[0].handphone,
            status: dataUser[0].status,
            codeKKA: dataUser[0].codeKKA,
            accessToken: token,
          },
        };

        res.status(200).send(response);
        return response;
      } else {
        let response = {
          code: hasil.code,
          message: hasil.message,
          error: hasil.description,
        };
        console.log(response);
        res.status(hasil.code).send(response);
        return response;
      }
    } catch (err) {
      let response = {
        code: 500,
        message: err,
        error: err,
      };
      console.log(response);
      res.status(500).send(response);
      return response;
    }
  },
};

module.exports = user;
