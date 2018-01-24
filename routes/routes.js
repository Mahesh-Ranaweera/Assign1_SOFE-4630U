var express = require('express');
var router = express.Router();
var dbconn = require('../app/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**GET Signin Page */
router.get('/signin', function(req, res, next){
  res.render('signin', { title: 'Signin' });
});

/**GET Signup Page */
router.get('/signup', function(req, res, next){
  res.render('signup', { title: 'Signup' });
});

module.exports = router;
