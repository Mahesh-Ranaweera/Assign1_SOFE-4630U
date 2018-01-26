var bcrypt = require('bcrypt');
/**Number of times salt is iterated */
var saltRounds = 10;

var passwHASH = function(passw){
    return bcrypt.hashSync(passw, saltRounds);
}

module.exports.passwHASH = passwHASH;