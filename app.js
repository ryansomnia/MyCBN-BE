const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
// const moment = require('moment');
// const multer = require('multer');
// const path = require('path');
const cors = require('cors');
const ejs = require('ejs');


//setting cors
app.options('*', cors());



let dotenv = require('dotenv');
let env = dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

//Set Templating Engine
app.set(ejs)
app.set('view engine', 'ejs')


// Navigation 
app.get('', (req,res) => {
    res.render('index')
})

app.use(cors());

app.use(morgan('dev'));


app.use('/', require('./router/router'))

app.all('/cbn/v1/*', [require('./middleware/validationdev')]);
// app.all('/myaccessapi/v2/*', [require('./middlewares/validate2')]);




app.listen(process.env.PORT, () => {
    console.log(`Server runnnnnnning in ${process.env.PORT}`);

})