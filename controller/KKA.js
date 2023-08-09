const connection = require("../config/MySQL");
const timeSetting = require("../helpers/timeSetting");
let dotenv = require("dotenv");
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
  getListKKA: async (req, res) => {
    try {
      let qry = "SELECT * FROM kka";
      let hasil = await connection.execQry(qry);
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
  PopInsert: async (req, res) => {
    try {
      let dateNow = timeSetting.getCurrentTime();
      let codeKKA = req.body.codeKKA;
      let persembahanGereja = req.body.persembahanGereja;
      let kasKKA = req.body.kasKKA;
      let tempat = req.body.tempat;
      let nextPW = req.body.nextPW;
      let nextSharing = req.body.nextSharing;
      let mempersiapkan = req.body.mempersiapkan;

      // let qry = `SELECT a.username, a.fullName, b.codeKKA, b.nama,
      //   b.wilayah
      //    FROM user a
      //   INNER JOIN kka b ON a.codeKKA = b.codeKKA
      //   WHERE a.username = '${username}'`;

      //   let hasil = await connection.execQry(qry)
      //   console.log(hasil);

      //   if (hasil.length === 0) {
      //       let response = {
      //       code: 400,
      //       message: 'error',
      //       data: 'username tidak ditemukan'
      //     };
      // return  res.status(400).send(response)

      //   }

      let insertQry = `INSERT INTO kkaReport (codeKKA, waktu, tempat, persembahanGereja, kasKKA, nextPW, nextSharing, mempersiapkan)
        VALUES ('${codeKKA}', '${dateNow}', '${tempat}', '${persembahanGereja}', ${kasKKA}, '${nextPW}', '${nextSharing}', '${mempersiapkan}')`;

      let hasilInsert = await connection.execQry(insertQry);
      console.log(hasilInsert);
      let response = {
        code: 201,
        message: "success",
        data: "data berhasil masuk",
      };
      console.log(response);
      return res.status(201).send(response);
    } catch (e) {
      console.log(e);
      let response = {
        code: 400,
        message: "error",
        error: e,
      };
      return res.status(400).send(response);
    }
  },
  scanQR: async (req, res) => {
    try {
      let username = req.body.username;
      let fullName = req.body.fullName;
      let codeKKA = req.body.codeKKA;
      let dateNow = timeSetting.getCurrentTime();
      let qry = `INSERT INTO kkaAbsen (username, fullname, codeKKA, datetime)
        VALUES ('${username}', ${fullName}, ${codeKKA}, ${dateNow})`;

      let hasil = await connection.execQry(qry);
      console.log(hasil);
      let response = {
        code: 201,
        message: "success",
        data: "data berhasil masuk",
      };
      console.log(response);
      return res.status(201).send(response);
    } catch (e) {
      let response = {
        code: 400,
        message: "error",
        data: e,
      };
      console.log(response);
      return res.status(400).send(response);
    }
  },
  generateLaporan: async (req, res) => {
    try {
      let username = req.body.username;
      let fullName = req.body.fullName;
      let namaKKA = req.body.namaKKA;
      let qry = "INSERT INTO";
      let hasil = await connection.execQry(qry);
      let response = {
        code: 200,
        message: "success",
        data: hasil,
      };
      console.log(response);
      res.status(200).send(response);
      return hasil;
    } catch (e) {
      console.log(e);
      let response = {
        code: 400,
        message: "error",
        error: e,
      };
      res.status(400).send(response);
    }
  },
  registrasiKKA: async (req, res) => {
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

    let namaLengkap = req.body.namaLengkap;

    if (namaLengkap == 0 || namaLengkap == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Nama Lengkap tidak terisi",
      };

      res.status(400).send(response);
      return response;
    }

    let noHP = req.body.noHP;
    if (noHP == 0 || noHP == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Nomor handphone tidak terisi",
      };

      res.status(400).send(response);
      return response;
    }

    if (checknumber(noHP)) {
      let response = {
        code: 400,
        message: "Error",
        error: "Nomor Handphone harus numerik",
      };
      res.status(400).send(response);
      return response;
    }

    let usia = req.body.usia;
    if (usia == 0 || usia == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "usia tidak terisi",
      };

      res.status(400).send(response);
      return response;
    }
    if (checknumber(usia)) {
      let response = {
        code: 400,
        message: "Error",
        error: "Usia harus numerik",
      };
      res.status(400).send(response);
      return response;
    }

    let statusPernikahan = req.body.statusPernikahan;
    if (statusPernikahan == 0 || statusPernikahan == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "status Pernikahan tidak terisi",
      };

      res.status(400).send(response);
      return response;
    }

    let wilayah = req.body.wilayah;

    if (wilayah == 0 || wilayah == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Wilayah tidak terisi",
      };

      res.status(400).send(response);
      return response;
    }

    let codeKKA = req.body.codeKKA;
    if (codeKKA == 0 || codeKKA == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "pilihan KKA tidak terisi",
      };

      res.status(400).send(response);
      return response;
    }

    try {
      let qry = `CALL registerMemberKKA('${username}','${namaLengkap}', '${noHP}', '${usia}', '${statusPernikahan}', '${wilayah}', '${codeKKA}')`;
      let hasil = await connection.execSP(qry);

      if (hasil.code === 200) {
        let response = {
          code: 200,
          message: "success",
          description: ` Selamat ${namaLengkap} telah mau bergabung dengan KKA, mohon menunggu beberapa waktu kedepan untuk di follow up keta KKA mu`,
        };

        console.log(response);
        res.status(200).send(response);
      } else {
        let error = {
          code: hasil.code,
          message: hasil.message,
          error: hasil.error,
        };
        console.log(error);
        res.status(400).send(error);
        return error;
      }
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
  insertLaporan: async (req, res) => {
    let { codeKKA, tglMulai, tempat } = req.body;
    try {
      if (!codeKKA || !tglMulai || !tempat) {
        const response = {
          code: 400,
          message: "Error",
          error: "Tolong lengkapi input yang ada",
        };
        console.log("====================================");
        console.log(response);
        console.log("====================================");
        res.status(400).send(response);
        return;
      }

      let qry = `INSERT INTO KKALaporan (codeKKA, tglMulai, tempat) VALUES ('${codeKKA}', '${tglMulai}', '${tempat}');`;
      await connection.execQry(qry);

      let selectQry = `SELECT * FROM KKALaporan WHERE codeKKA = '${codeKKA}' AND tglMulai = '${tglMulai}' AND tempat = '${tempat}' ORDER BY idKKALaporan DESC LIMIT 1;`;
      const result = await connection.execQry(selectQry);

      let response = {
        code: 201,
        message: "success",
        description: `data berhasil masuk`,
        data: result, // Kirim data yang sudah masuk sebagai respon
      };

      console.log(response);
      res.status(201).send(response);
    } catch (error) {
      let response = {
        code: 500,
        message: "Internal Server Error",
        description: error,
      };

      console.log(response);
      res.status(500).send(response);
    }
  },
  insertLaporanKeuangan: async (req, res) => {
    let { IDLaporan, persembahan, kasGereja, total } = req.body;
 
    try {
      if (!IDLaporan || !persembahan || !kasGereja || !total) {
        const response = {
          code: 400,
          message: "Error",
          error: "Tolong lengkapi input yang ada",
        };
        console.log("====================================");
        console.log(response);
        console.log("====================================");
        res.status(400).send(response);
        return;
      }

      let qry = `INSERT INTO KKAKeuangan (IDLaporan, persembahan, kasGereja, total) VALUES ('${IDLaporan}', '${persembahan}', '${kasGereja}', '${total}');`;
      await connection.execQry(qry);

      let response = {
        code: 201,
        message: "success",
        description: `data berhasil masuk`,
      };

      console.log(response);
      res.status(201).send(response);
    } catch (error) {
      let response = {
        code: 500,
        message: "Internal Server Error",
        description: error,
      };

      console.log(response);
      res.status(500).send(response);
    }
  },
  insertLaporanNextAgenda: async (req, res) => {
    let { IDLaporan, WL, firman, doa, mempersiapkan, tempat } = req.body;
 
    try {
      if (!IDLaporan || !WL || !firman || !doa || !mempersiapkan || !tempat) {
        const response = {
          code: 400,
          message: "Error",
          error: "Tolong lengkapi input yang ada",
        };
        console.log("====================================");
        console.log(response);
        console.log("====================================");
        res.status(400).send(response);
        return;
      }

      let qry = `INSERT INTO KKAAgenda (IDLaporan, WL, firman, doa, mempersiapkan, tempat) VALUES ('${IDLaporan}', '${WL}', '${firman}', '${doa}', '${mempersiapkan}', '${tempat}');`;
      await connection.execQry(qry);

      let response = {
        code: 201,
        message: "success",
        description: `data berhasil masuk`,
      };

      console.log(response);
      res.status(201).send(response);
    } catch (error) {
      let response = {
        code: 500,
        message: "Internal Server Error",
        description: error,
      };

      console.log(response);
      res.status(500).send(response);
    }
  },
};

module.exports = KKA;
