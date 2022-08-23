//Pool of all the athrev-ed db accesses
console.log("inside dg - config 1");
const { Pool } = require("pg");

const config = {
    host: 'localhost',
    port: '5432',
    database: 'AirlineSystem',
    user: 'postgres',
    password: 'vini@111'
};
const pool = new Pool(config);
// const config = 'postgres://enuabmqzpwxnwf:c0699ccfe8749ee8df78d1415e5933c48e54333670452874bce128d5e9323cff@ec2-34-232-191-133.compute-1.amazonaws.com:5432/dbdcohvt5njf0m';
// const pool = new Pool({ connectionString: config, ssl: { rejectUnauthorized: false } });
module.exports = pool;