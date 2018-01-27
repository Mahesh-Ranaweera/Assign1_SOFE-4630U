
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
  var alert = null;

  if(req.query.notify != null){
    alert = req.query.notify;
  }

  res.render('signin', {
    title: 'Signin',
    alert: alert
  });
});

/**POST Signin */
router.post('/signin', function (req, res, next) {
  var email = req.body.strEmail;
  var passw = req.body.strPassw;

  dbconn.getUSER(email, function(state){

    /**JSON Objects */
    user_data = JSON.stringify(state);

    //check if user exists
    if(state != null){
      user_data = JSON.parse(user_data);

      //Makesure email is correct and password is correct
      if(user_data[0].email == email && encrypt.compareHASH(passw, user_data[0].passw)){
        /**User Authenticated */
        res.redirect('/signin?notify=success');
      }else{
        /**Password Error */
        res.redirect('/signin?notify=passw');
      }
    }else{
      /**User not found */
      res.redirect('/signin?notify=notfound');
    }
  });
})

/**GET Signup Page */
router.get('/signup', function (req, res, next) {
  var alert = null;

  if(req.query.notify != null){
    alert = req.query.notify;
  }

  res.render('signup', {
    title: 'Signup',
    alert: alert
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
      if(state == 1){
        //console.log('Entered');
        res.redirect('/signup?notify=success');
      }else if(state == -1){
        //console.log('Duplicate');
        res.redirect('/signup?notify=duplicate');
      }else{
        //console.log('Error');
        res.redirect('/signup?notify=error')
      }
    });

  } else {
    res.redirect('/signup?notify=passw');
  }
})

module.exports = router;