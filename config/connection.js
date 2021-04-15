// const mysql2 = require('mysql2');
let dotenv = require('dotenv');
let env = dotenv.config();
const mysql2 = require('mysql2');
const conn = mysql2.createConnection({
    host: process.env.gear_HOST,
    user: process.env.gear_USERNAME,
    password: process.env.gear_PASSWORD,
    database: process.env.gear_DATABASE,
})


conn.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Mysql terkoneksi');
    }
})


module.exports = conn;