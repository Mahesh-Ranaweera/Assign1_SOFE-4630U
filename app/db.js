/**
 * Contain the connection to the mongo database
 */

 const {
     Client
 } = require('pg')

 const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'webapp',
    password: 'a2fb22ce710899f6e455b3984ee16930',
    post: 5432,
});

client.connect();

client.on('error', (err, client)=>{
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

const query = await client.query(
    'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, fname VARCHAR(100), lname VARCHAR(100))'
);

await client.end();
