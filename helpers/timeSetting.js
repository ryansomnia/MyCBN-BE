// import library Moment.js
const moment = require('moment-timezone');



// fungsi untuk mengeluarkan tanggal dan waktu sekarang
exports.getCurrentTime = () => {
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    return currentTime;
  }