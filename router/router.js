const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const verifikasi = require('../middleware/verifikasi')
const user = require('../controller/User')
const artikel = require('../controller/Artikel')


//menu regis n login
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);


//alamat otorisasi
router.get('/api/v1/rahasia', verifikasi.verifikasi(), auth.halamanrahasia);
router.get('/api/v1/admin', verifikasi.verifikasiAdmin(), auth.halamanAdmin);
// formula rest (url, verivied sebagai?, crud)

router.get('/getuser', user.getAllData);
router.post('/adduser', user.addOneData);
router.delete('/deleteuser', user.deleteOneData);
router.put('/edituser', user.editOneData);



router.get('/getAllArticle', artikel.getAllData );
router.post('/addArticle', artikel.addOneData );

module.exports = router;