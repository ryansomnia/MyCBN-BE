// import library Moment.js
const moment = require('moment-timezone');



// fungsi untuk mengeluarkan tanggal dan waktu sekarang
exports.getCurrentTime = () => {
    const currentTime = moment().format("DD-MM-YYYY HH:mm:ss");
    return currentTime;
  }