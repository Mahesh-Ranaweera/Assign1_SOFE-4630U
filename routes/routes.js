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

  data = {
     email: email
  }

  dbconn.getUSER(data, function(state){

    user_data = JSON.stringify(state[0]);
    console.log(user_data);
    console.log(user_data["email"]);

    //check if user exists
    if(state != null){
      //authenticate the user
      if(user_data.email == email){
        console.log("Correct email");
      }else{
        console.log("wrong email");
      }
    }else{
      console.log("USER DOES NOT EXISTS");
    }
    
    res.redirect('/signin');
  });
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
    /**Add the data to db */
    dbconn.addUSER(data, function(state){
      if(state){
        console.log('Entered');
      }else{
        console.log('Error');
      }
      res.redirect('/signup?passw=success');
    });

  } else {
    res.redirect('/signup?passw=error');
  }
})

module.exports = router;