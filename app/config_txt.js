/**
 * Config:: postgre connection credetials
 * Rename this file to config.js
 */

/**Local development credentials */
var dbconnect = {
    dbhost: "localhost",
    db: "webapp",
    dbuser: "postgres",
    dbport: "5432",
    dbpassw: "a2fb22ce710899f6e455b3984ee16930"
}

/**Heroku connection credentials */
// var dbconnect = {
//     dbhost: "",
//     db: "",
//     dbuser: "",
//     dbport: "5432",
//     dbpassw: ""
// }

module.exports.dbconnect = dbconnect;