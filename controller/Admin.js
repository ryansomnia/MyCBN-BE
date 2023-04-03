const connection = require("../config/MySQL");
let dotenv = require("dotenv");
let env = dotenv.config();
const moment = require("moment");
const jwt = require("jsonwebtoken");

let checknumber = (data) => {
  let reg = new RegExp("^[0-9]+$");
  if (!reg.test(data)) {
    return true;
  } else {
    return false;
  }
};

let admin = {
  register: async (req, res) => {
    let date = moment(Date.now()).format("DD");
    let val = Math.floor(100 + Math.random() * 900);
    let idReg = `${date}${val}`;

    let username = req.body.username;

    let password = req.body.password;
    let reTypePass = req.body.reTypePass;
    let fullName = req.body.fullName;
    let sex = req.body.sex;
    let address = req.body.address;
    let email = req.body.email;
    let handphone = req.body.handphone;

    if (req.body == 0 || req.body == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "data ada yang belum terisi",
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
  },
  login: async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (req.body == 0 || req.body == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "data ada yang belum terisi",
      };

      res.status(400).send(response);
      return response;
    }

  
    try {
      let qry = `CALL loginAdmin ('${username}', '${password}')`;
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
        res.status(401).send(response)
        res.status(hasil);
      }
    } catch (error) {
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

module.exports = admin;
