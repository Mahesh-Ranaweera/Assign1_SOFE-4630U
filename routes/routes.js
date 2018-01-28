var express = require('express');
var router = express.Router();
var dbconn = require('../app/db');
var encrypt = require('../app/encrypt');
var session = require('express-session');

//set the session
router.use(session({
    secret: 'HV3U00lcMahc84050VxX62xoMS67NhS4',
    resave: false,
    saveUninitialized: true,
    path: '/'
}));

//start a session
var sess;

/* GET home page. */
router.get('/', function(req, res, next) {
    /**Redirect user if session exists */
    if (req.session.usersess) {
        res.redirect('/dashboard');
    } else {
        res.render('index', {
            title: 'Notebook'
        });
    }
});

/**GET Signin Page */
router.get('/signin', function(req, res, next) {
    var alert = null;

    if (req.query.notify != null) {
        alert = req.query.notify;
    }

    res.render('signin', {
        title: 'Notebook:signin',
        alert: alert
    });
});

/**POST Signin */
router.post('/signin', function(req, res, next) {
    var email = req.body.strEmail;
    var passw = req.body.strPassw;

    dbconn.getUSER(email, function(state) {

        /**JSON Objects */
        user_data = JSON.stringify(state);

        //check if user exists
        if (state != null) {
            user_data = JSON.parse(user_data);

            //Makesure email is correct and password is correct
            if (user_data[0].email == email && encrypt.compareHASH(passw, user_data[0].passw)) {
                /**Create a session for the user */
                sess = req.session;
                sess.usersess = true;
                sess.email = user_data[0].email;
                sess.name = user_data[0].fname + ' ' + user_data[0].lname;

                /**User Authenticated */
                res.redirect('/dashboard');
            } else {
                /**Password Error */
                res.redirect('/signin?notify=passw');
            }
        } else {
            /**User not found */
            res.redirect('/signin?notify=notfound');
        }
    });
});

/**GET Signup Page */
router.get('/signup', function(req, res, next) {
    var alert = null;

    if (req.query.notify != null) {
        alert = req.query.notify;
    }

    res.render('signup', {
        title: 'Notebook:signup',
        alert: alert
    });
});

/**POST Student Signup */
router.post('/signup', function(req, res, next) {

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
        dbconn.addUSER(data, function(state) {
            if (state == 1) {
                //console.log('Entered');
                res.redirect('/signup?notify=success');
            } else if (state == -1) {
                //console.log('Duplicate');
                res.redirect('/signup?notify=duplicate');
            } else {
                //console.log('Error');
                res.redirect('/signup?notify=error')
            }
        });

    } else {
        res.redirect('/signup?notify=passw');
    }
});

/**GET Student Dashboard */
router.get('/dashboard', function(req, res, next) {

    /**Makesure user session exists */
    if (req.session.usersess) {
        username = sess.name;
        useremail = sess.email;

        /**GET users notes */
        dbconn.getNotes(useremail, function(state) {

            /**GET JSON data */
            notes_data = JSON.stringify(state);
            notes_data = JSON.parse(notes_data);
            //console.log(notes_data);

            res.render('dashboard', {
                title: 'Dashboard',
                name: username,
                notes: notes_data
            });
        });
    } else {
        res.redirect('/');
    }
});

/**GET new notes */
router.get('/newnotes', function(req, res, next) {

    /**Makesure user session exists */
    if (req.session.usersess) {
        username = sess.name;
        useremail = sess.email;

        res.render('newnotes', {
            title: 'Dashboard',
            head: null,
            subhead: null,
            content: null
        });
    } else {
        res.redirect('/');
    }
});

/**SAVE note */
router.post('/savenote', function(req, res, next) {
    /**Makesure user session exists */
    if (req.session.usersess) {
        data = {
            email: sess.email,
            head: req.body.strHead,
            subhead: req.body.strSubhead,
            content: req.body.strContent
        }

        //console.log(data);
        dbconn.addNote(data, function(state) {
            if (state == 1) {
                res.redirect('/dashboard');
            } else {
                res.render('newnotes', {
                    title: 'Dashboard',
                    head: data.head,
                    subhead: data.subhead,
                    content: data.content,
                    alert: 'error'
                });
            }
        });
    } else {
        res.redirect('/');
    }
});


/**SIGNOUT */
router.get('/signout', function(req, res, next) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;