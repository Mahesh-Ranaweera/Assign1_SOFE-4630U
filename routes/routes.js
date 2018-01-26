var express = require('express');
var router = express.Router();
var dbconn = require('../app/db');
var encrypt= require('../app/encrypt');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

/**GET Signin Page */
router.get('/signin', function (req, res, next) {
  res.render('signin', {
    title: 'Signin'
  });
});

/**POST Signin */
router.post('/signin', function (req, res, next) {
  var email = req.body.strEmail;
  var passw = req.body.strPassw;

  console.log(email, passw);

  res.redirect('/signin');
})

/**GET Signup Page */
router.get('/signup', function (req, res, next) {
  res.render('signup', {
    title: 'Signup'
  });
});

/**POST Student Signup */
router.post('/signup', function (req, res, next) {

  var email = req.body.strEmail.toLowerCase();
  var fname = req.body.strFname;
  var lname = req.body.strLname;

  var passw1 = req.body.strPassw1;
  var passw2 = req.body.strPassw2;

  if (passw1 == passw2) {
    data = {
      email: email,
      fname: fname,
      lname: lname,
      passw: encrypt.passwHASH(passw1)
    }

    //console.log(data);

    if(dbconn.addUSER(data)){
      console.log('Entered');
    }else{
      console.log('Error');
    }
    res.redirect('/signup');
  } else {
    res.redirect('/signup?passw=error');
  }
})

module.exports = router;