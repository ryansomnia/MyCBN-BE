// const mongoose = require('mongodb');
const MongoClient = require("mongodb").MongoClient;
let dotenv = require('dotenv');
 let env = dotenv.config();
const client = new MongoClient(process.env.URI);

 client.connect()
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. ${err}`);
    })

