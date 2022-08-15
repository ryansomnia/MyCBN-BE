const express = require('express');
const router = express.Router();
const verikasi = require('../middleware/validation')
const user = require('../controller/User')
const pastoral = require('../controller/Pastoral')
const artikel = require('../controller/Artikel')
// const doa = require('../controller/Prayer')
const kka = require('../controller/KKA');
const verse = require('../controller/Verse');
// const upload = require('../helpers/uploadImage');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null, "./aset");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({ storage : storage })
// // cbn USER
router.get('/cbn/v1/user/getuser', verikasi.validation(), user.getAllData);
router.post('/cbn/v1/user/registrasi', user.registrasi);
router.post('/cbn/v1/user/deleteAccount', user.deleteAccount);
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
router.get('/cbn/v1/artikel/getAllArticle',verikasi.validation(), artikel.getAllData );
router.get('/cbn/v1/artikel/getDataArtikel',verikasi.validation(), artikel.getDataArtikel );
router.get('/cbn/v1/artikel/getDataRenungan',verikasi.validation(), artikel.getDataRenungan );
router.post('/cbn/v1/artikel/addOneArticleB',verikasi.validation(), artikel.addArtikel );
// router.post('/editOneArticle', artikel.editOneData);
router.post('/cbn/v1/artikel/deleteOneArticle', verikasi.validation(), artikel.deleteOneData );

// Verse
router.get('/cbn/v1/verse/getVerse', verikasi.validation(), verse.getVerse );
router.post('/cbn/v1/verse/addVerse', verikasi.validation(), verse.addVerse );

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