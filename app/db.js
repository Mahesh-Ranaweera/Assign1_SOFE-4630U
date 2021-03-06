/**
 * Contain the connection to the mongo database
 */

var remoteDB = require("./config");

const {
    Client
} = require('pg')

/**Connection credentials */
const client = new Client({
    user: remoteDB.dbconnect.dbuser,
    host: remoteDB.dbconnect.dbhost,
    database: remoteDB.dbconnect.db,
    password: remoteDB.dbconnect.dbpassw,
    port: remoteDB.dbconnect.dbport,
    ssl: true
});

client.connect();

client.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

/**Create table if not exists */
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
    'content TEXT NOT NULL,' +
    'date VARCHAR(25) NOT NULL,' +
    'share INT NOT NULL);';

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

    var sql = "INSERT INTO notes(email, heading, subhead, content, date, share) values($1, $2, $3, $4, $5, $6)";
    var values = [data.email, data.head, data.subhead, data.content, data.date, data.share];

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

    var sql = "SELECT id, email, heading, subhead, content, date, share FROM notes WHERE email=$1 ORDER BY id DESC";
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

/**Update note */
var updateNote = function(data, callback) {
    var sql = "UPDATE notes SET content=$1, share=$2 WHERE id=$3";
    var values = [data.content, data.share, data.id];

    client.query(sql, values, (err, res) => {
        if (err) {
            callback(0);
        } else {
            callback(1);
        }
    });
}

/**get all public notes */
var publicnotes = function(callback) {
    var sql = "SELECT notes.*, users.email, users.fname FROM notes INNER JOIN users ON notes.email=users.email WHERE share=1";

    client.query(sql, (err, res) => {
        if (err) {
            callback(err);
        } else {
            if (res.rows.length == 0) {
                callback(null);
            } else {
                callback(res.rows);
            }
        }
    })
}

/**get all search query */
var searchnotes = function(data, callback) {
    var sql = "SELECT notes.*, users.email, users.fname FROM notes INNER JOIN users ON notes.email=users.email WHERE share=1 AND LOWER(heading) LIKE '%" + data.query + "%' OR LOWER(subhead) LIKE '%" + data.query + "%' OR date LIKE '%" + data.query + "%'";

    client.query(sql, (err, res) => {
        if (err) {
            callback(err);
        } else {
            if (res.rows.length == 0) {
                callback(null);
            } else {
                callback(res.rows);
            }
        }
    })
}

/**Export the modules */
module.exports.addUSER = addUSER;
module.exports.getUSER = getUSER;
module.exports.addNote = addNote;
module.exports.getNotes = getNotes;
module.exports.deleteNote = deleteNote;
module.exports.updateNote = updateNote;
module.exports.publicnotes = publicnotes;
module.exports.searchnotes = searchnotes;