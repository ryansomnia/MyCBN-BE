const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const verifikasi = require('../middleware/verifikasi')
const user = require('../controller/User')
const pastoral = require('../controller/Pastoral')
const artikel = require('../controller/Artikel')
const doa = require('../controller/Prayer')
const kka = require('../controller/KKA')
const cron = require("node-cron");
const { haltOnTimedout, errorFilter } = require('../helpers/connectTimeOut');

var timeout=require('connect-timeout');
//menu regis n login
router.post('/api/v1/register',timeout(5000), auth.registrasi, haltOnTimedout, errorFilter);
router.post('/api/v1/login',timeout(5000),auth.login, haltOnTimedout, errorFilter);


//alamat otorisasi
router.get('/api/v1/rahasia', verifikasi.verifikasi(), auth.halamanrahasia);
router.get('/api/v1/admin', verifikasi.verifikasiAdmin(), auth.halamanAdmin);
// formula rest (url, verivied sebagai?, crud)

// API USER
router.get('/getuser', user.getAllData);
router.post('/adduser', user.addOneData);
router.delete('/deleteuser', user.deleteOneData);
router.post('/edituser', user.selectOneUser);
router.post('/edituser', user.editOneUser);
//API Pastoral
router.get('/pastoral', pastoral.getAllData);
router.post('/OnePastoral', pastoral.getbyUser);

//API ARTIKEL
router.get('/getAllArticle', artikel.getAllData );
router.post('/addOneArticle', artikel.addOneData );
router.post('/editOneArticle', artikel.editOneData);
router.delete('/deleteOneArticle', artikel.deleteOneData );

// API GET Renungan
router.get('/getAllRenungan', artikel.getAllRenungan );
router.post('/getOneRenungan', artikel.getOneRenungan );
// API GET News
router.get('/getAllNews', artikel.getAllNews );
router.post('/getOneNews', artikel.getOneNews );


//API DOA
router.get('/getAllDoa', doa.getAllData );
router.post('/addOneDoa', doa.addOneData );
router.post('/getDoabyUser', doa.getbyUser);
router.delete('/deleteOneDoa', doa.deleteOneData);


//API KKA
router.get('/getAllKKA', kka.getAllData );
router.get('/getAllKKA', kka.getbyName );
router.get('/getAllKKA', kka.getbyArea );
router.post('/addOneKKA', kka.addOneData );
router.delete('/deleteOneKKA', kka.deleteOneData);



// CRON
// cron.schedule('* * * * *', () => {
//     console.log('Notifikasi OTP email : running a task every 1 minute  : ' + new Date().toISOString());
//     user.sendEmailverivikasiAkun();
// });

router.post('/sendEmailVerifikasi', user.sendEmailverivikasiAkun );
router.post('/sendOTP', user.sendOTP );
router.get('/updateVerivikasiAkun/:email',user.updateVerivikasiAkun);


module.exports = router;