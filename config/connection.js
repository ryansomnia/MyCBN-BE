let dotenv = require('dotenv');
let env = dotenv.config();
const mysql2 = require('mysql2');
// let db = require('../config/secret');

exports.execSP = async (query) => {

   
    try{
        const connect =  await mysql2.createConnection({
            host: process.env.local_HOST,
            // port: process.env.local_PORT,
            user: process.env.local_USERNAME,
            password: process.env.local_PASSWORD,
            database: process.env.local_DATABASE,

        })
        
        return new Promise ((resolve, reject) =>{
         
            if(connect){
                connect.connect( function (err) {
                    if (err) {
                        let response = {
                            code: 500,
                            message : err
                        }
                        return response
                    }                    
                });
                if (query) {
                    connect.query(query, function (error, result, rows, fields) {
                        connect.end();
                        if (error) {
                            throw error;
                        } else {
                            // console.log("rrr",result[0][0].code);
                            return resolve(result[0][0]);
                         
                        }
                    });
                } else {
                    connect.end()
                }

            } else {
                console.log('failed connect')
                let response = {
                    code: 500,
                    message : 'error connect'
                }
                return response
            }
        }) 
    } catch (err) {
        response ={
            code: '301',
            message: 'Failed',
            error: err ? (err.message ? err.message : '') : ''
        };
        return response;
    }
}
exports.execQry = async (query) => {

   
    try{
        const connect =  await mysql2.createConnection({
            host: process.env.local_HOST,
            // port: process.env.local_PORT,
            user: process.env.local_USERNAME,
            password: process.env.local_PASSWORD,
            database: process.env.local_DATABASE
        })
        
        return new Promise ((resolve, reject) =>{
         
            if(connect){
                connect.connect( function (err) {
                    if (err) {
                        let response = {
                            code: 500,
                            message : err
                        }
                        return response
                    }                    
                });
                if (query) {
                    connect.query(query, function (error, result, rows, fields) {
                        connect.end();
                        if (error) {
                            console.log(error);
                            throw error;
                        } else {
                            // console.log("rrr",result[0][0].code);
                            return resolve(result)
                        }
                    });
                } else {
                    connect.end()
                }

            } else {
                console.log('failed connect')
                let response = {
                    code: 500,
                    message : 'error connect'
                }
                return response
            }
        }) 
    } catch (err) {
        response ={
            code: '301',
            message: 'Failed',
            error: err ? (err.message ? err.message : '') : ''
        };
        return response;
    }
}