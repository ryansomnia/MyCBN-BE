const express = require('express');
// const auth = require('../middleware/auth');
const router = express.Router();
// const verifikasi = require('../middleware/verifikasi')
// const validation = require('../middleware/validation')
const user = require('../controller/User')
const pastoral = require('../controller/Pastoral')
const artikel = require('../controller/Artikel')
// const doa = require('../controller/Prayer')
const kka = require('../controller/KKA')
// const cron = require("node-cron");
// const { haltOnTimedout, errorFilter } = require('../helpers/connectTimeOut');

// var timeout=require('connect-timeout');



// // cbn USER
router.get('/cbn/v1/user/getuser', user.getAllData);
router.post('/cbn/v1/user/registrasi', user.registrasi);
router.post('/cbn/v1/user/deleteAccount', user.deleteAccount);
router.post('/cbn/v1/user/otpMailConfirmation', user.otpMailConfirmation);
router.post('/cbn/v1/user/validateAccount', user.validateAccount);
router.post('/cbn/v1/user/login', user.login);



// router.post('/adduser', user.addOneData);
// router.delete('/deleteuser', user.deleteOneData);
// router.post('/edituser', user.selectOneUser);
// router.post('/edituser', user.editOneUser);

//cbn Pastoral
// router.post('/cbn/v1/pastoral/permohonanDoa', pastoral.permohonanDoa);
// router.post('/cbn/v1/pastoral/pelayananKematian', pastoral.getbyUser);
// router.post('/cbn/v1/pastoral/pelayananPernikahan', pastoral.getbyUser);
// router.post('/cbn/v1/pastoral/pelayananBaptisan', pastoral.getbyUser);
// router.post('/cbn/v1/pastoral/pelayananPenyerahanAnak', pastoral.getbyUser);
// router.post('/cbn/v1/pastoral/pelayananKonseling', pastoral.getbyUser);

// //cbn ARTIKEL
router.get('/getAllArticle', artikel.getAllData );
router.post('/addOneArticle', artikel.addArtikel );
// router.post('/editOneArticle', artikel.editOneData);
// router.delete('/deleteOneArticle', artikel.deleteOneData );

// // cbn GET Renungan
// router.get('/getAllRenungan', artikel.getAllRenungan );
// router.post('/getOneRenungan', artikel.getOneRenungan );
// // cbn GET News
// router.get('/getAllNews', artikel.getAllNews );
// router.post('/getOneNews', artikel.getOneNews );


// //cbn DOA
// router.get('/getAllDoa', doa.getAllData );
// router.post('/addOneDoa', doa.addOneData );
// router.post('/getDoabyUser', doa.getbyUser);
// router.delete('/deleteOneDoa', doa.deleteOneData);


// //cbn KKA
router.get('/cbn/v1/KKA/getListKKA', kka.getListKKA );
router.post('/cbn/v1/KKA/registrasiKKA', kka.registrasiKKA );




// // CRON
// // cron.schedule('* * * * *', () => {
// //     console.log('Notifikasi OTP email : running a task every 1 minute  : ' + new Date().toISOString());
// //     user.sendEmailverivikasiAkun();
// // });

// router.post('/sendEmailVerifikasi', user.sendEmailverivikasiAkun );
// router.post('/sendOTP', user.sendOTP );
// router.get('/updateVerivikasiAkun/:email',user.updateVerivikasiAkun);


module.exports = router;