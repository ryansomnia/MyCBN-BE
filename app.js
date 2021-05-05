const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const moment = require('moment');
// const multer = require('multer');
// const path = require('path');
const cors = require('cors');

//setting cors
app.options('*', cors());



let dotenv = require('dotenv');
let env = dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());

app.use(morgan('dev'));

// const storage = multer.diskStorage({
//     destination : path.join(__dirname + './../public/images/'),
//     filename: function(req, file, cb){
//         cb(null, file.fieldname + '-' + Date.now() +
//         path.extname(file.originalname));
//     }
// });

// const upload = multer({
//     storage : storage
// }).single('picture');

app.use('/', require('./router/router'))
app.use('/auth', require('./router/router'))





app.listen(process.env.PORT, () => {
    console.log(`Server running in ${process.env.PORT}`);
    // let dateCreated =  moment.
    // console.log(dateCreated);
})