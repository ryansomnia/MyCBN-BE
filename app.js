const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const ip = require('ip');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(fileUpload());

app.use(express.static('public'));

app.use(morgan('dev'));

// Health Check
app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        service: 'GPPK API',
        status: 'running',
        port: process.env.PORT,
        timestamp: new Date()
    });
});

// CORS Headers
app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key'
    );

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// Router
app.use('/', require('./router/router'));

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        code: 404,
        message: 'URL tidak ditemukan'
    });
});

const PORT = process.env.PORT || 5001;
const localIPAddress = ip.address();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Local IP Address: ${localIPAddress}`);
});