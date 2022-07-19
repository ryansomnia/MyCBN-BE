
const multer = require('multer');
// require('./../assets/image/article')
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/image/article')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname )
    }
  })

     
  let upload = multer({ storage: storage })

  module.exports = upload;