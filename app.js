const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
// const moment = require('moment');
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


app.use('/', require('./router/router'))
app.use('/auth', require('./router/router'))





app.listen(process.env.PORT, () => {
    console.log(`Server running in ${process.env.PORT}`);

})