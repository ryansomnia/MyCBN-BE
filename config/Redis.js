const redis = require('redis')
const client = redis.createClient();

// const client = redis.createClient("127.0.0.1","6379");
console.log('Redis');
client.on('connect', function () {
    console.log("Redis Connected!");
})
