/**
 * Contain the connection to the mongo database
 */

var remoteDB = require("./config");

const {
    Client
} = require('pg')

const client = new Client({
    user: remoteDB.dbconnect.dbuser,
    host: remoteDB.dbconnect.dbhost,
    database: remoteDB.dbconnect.db,
    password: remoteDB.dbconnect.dbpassw,
    post: remoteDB.dbconnect.dbport,
});

client.connect();

client.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

const createTB =
    'CREATE TABLE IF NOT EXISTS users(' +
    'email VARCHAR(100) PRIMARY KEY,' +
    'fname VARCHAR(100) NOT NULL,' +
    'lname VARCHAR(100) NOT NULL,' +
    'passw VARCHAR(100) NOT NULL);' +
    'CREATE TABLE IF NOT EXISTS notes(' +
    'id SERIAL PRIMARY KEY,' +
    'email VARCHAR(100) NOT NULL,' +
    'heading VARCHAR(200) NOT NULL,' +
    'subhead VARCHAR(200) NOT NULL,' +
    'content TEXT NOT NULL);'

client.query(createTB, (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        console.log("|| TABLES CREATED ||")
    }
});

/**Add new user to db */
var addUSER = function(data, callback) {

    var sql = "INSERT INTO users(email, fname, lname, passw) values($1, $2, $3, $4)";
    var values = [data.email, data.fname, data.lname, data.passw];

    client.query(sql, values, (err, res) => {
        if (err) {
            //console.log(err);

            //duplicate KEY
            if (err.code == 23505) {
                callback(-1);
            } else {
                callback(0);
            }
        } else {
            //console.log(res);
            callback(1);
        }
    });
}

/**Get user data for signin */
var getUSER = function(useremail, callback) {

    var sql = "SELECT email, fname, lname, passw FROM users WHERE email=$1";
    var values = [useremail];

    client.query(sql, values, (err, res) => {
        if (err) {
            //console.log(err);
            callback(err);
        } else {
            if (res.rows.length == 0) {
                callback(null);
            } else {
                callback(res.rows);
            }
        }
    });
}

/**Add notes */
var addNote = function(data, callback) {

    var sql = "INSERT INTO notes(email, heading, subhead, content) values($1, $2, $3, $4)";
    var values = [data.email, data.head, data.subhead, data.content];

    client.query(sql, values, (err, res) => {
        if (err) {
            callback(0);
        } else {
            callback(1);
        }
    });
}

/**GET notes from db */
var getNotes = function(useremail, callback) {

    var sql = "SELECT id, email, heading, subhead, content FROM notes WHERE email=$1 ORDER BY id DESC";
    var values = [useremail];

    client.query(sql, values, (err, res) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            if (res.rows.length == 0) {
                callback(null);
            } else {
                callback(res.rows);
            }
        }
    });
}

/**Delete note */
var deleteNote = function(id, callback) {
    var sql = "DELETE FROM notes WHERE id=$1";
    var values = [id];

    client.query(sql, values, (err, res) => {
        if (err) {
            callback(0);
        } else {
            callback(1);
        }
    });
}

/**Export the modules */
module.exports.addUSER = addUSER;
module.exports.getUSER = getUSER;
module.exports.addNote = addNote;
module.exports.getNotes = getNotes;
module.exports.deleteNote = deleteNote;