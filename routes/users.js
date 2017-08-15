var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Major = require('../models/major_giveaway');
var One = require('../models/otherone');
var Two = require('../models/othertwo');
var Three = require('../models/otherthree');
var Ramp = require('../models/ramp');


router.get('/home',function(req,res){
      res.render('home');
});


router.get('/winners',function(req,res){
  //getting data_id
  console.log('1');
  var data1,data2,data3,data4,data11,data22,data33,data44;
    User.find({winner:"yes"}).then(function (result) {
       data1 = result[0];
       data2 = result[1];
       data3 = result[2];
       data4 = result[3];
      User.find({ogw:"yes"}).then(function(out){
         data11 = out[0];
         data22 = out[1];
         data33 = out[2];
         data43 = out[3];
    console.log(data1+data2+data3+data4+data11+data22+data44+data33);
  res.render('winner',{data1:data1,data2:data2,data3:data3,data4:data4,data11:data11,data22:data22,data33:data33,data44:data44});
      });


  });

});

router.get('/screen',function(req,res){
      res.render('screenshot');
});

router.get('/tac',function(req,res){
      res.render('tac');
});

router.get('/login',ensureAuthenticated_two,function(req,res){
      res.render('login');
});

router.get('/signup',ensureAuthenticated_two,function(req,res){
      res.render('signup');
});

router.get('/donate',function(req,res){
      res.render('donate');
});

router.get('/pick',function(req,res){
      res.render('pick');
});

router.get('/contact',function(req,res){
      res.render('contact');
});

router.get('/submit',function(req,res){
      res.render('submit');
});


//sending mails watch liked video
router.post('/email', ensureAuthenticated,function(req, res){
	var query = req.body.query;
	var mobile= req.body.mobile;
	var name= req.body.name;
  console.log(query);
	req.checkBody('name','your name is required').notEmpty();
	req.checkBody('query','your query is required').notEmpty();
	req.checkBody('mobile','mobile number is required').notEmpty();
	var error = req.getValidationResult().then(function(result){
        if(!result.isEmpty()) {
            console.log(result.array());
            //return;
        } else {
            console.log('Validation Ok');
            var transporter = nodemailer.createTransport({
        				service: 'gmail',
          			port: 465,
          			secure: true,
        				auth: {
      						user: 'vincerlaarjun@gmail.com',
      							pass: '20@mix28'
        							}
      								});

      		var mailOptions = {
      					   from: 'vincerlaarjun@gmail.com',
      					   to: 'vincerlaarjun@gmail.com',
      					   subject: mobile+" "+name,
      					   text: "  dsdnvbis"
      					};

      			transporter.sendMail(mailOptions, function(error, info){
      			  			if (error) {
      			    						console.log(error);
      											req.flash('error_msg', 'An error orrur while sending your query');
      											res.render('submit');
      			  							} else {
      			    										console.log('Email sent: ' + info.response);
      															req.flash('success_msg', 'Your message has been successfully sent. You will recieve our response within 24 hours');

      															res.redirect('/users/submit');
      			  											}
      																							});
        }
      });
});



// Register User
router.post('/signup', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var mobile = req.body.mobile;
	var password = req.body.password;
	var password2 = req.body.password2;
	var tradeurl = req.body.url;
  var did=req.body.friends;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('url','Steam trade url is required').notEmpty();
  req.checkBody('friends','Dota2 friends id is required').notEmpty();
	req.checkBody('mobile', 'Mobile number is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('signup',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			tradeurl:tradeurl,
			mobile: mobile,
			password: password,
      dotaid:did,
      winner:'no',
      allwinner:'no',
      ogw:'no',
      allogw:'no'
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});


passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});



router.post('/login',
  passport.authenticate('local', {successRedirect:'/users/home', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

	router.get('/logout', function(req, res){
		req.logout();

		req.flash('success_msg', 'You are logged out');

		res.redirect('/users/home');
	});


//major giveaway reg
router.post('/major',ensureAuthenticated,function(req,res){
        var data_id = req.body.di;
          Major.findOne({dotaid:data_id}).then(function (result) {
            if(result){
              req.flash('error_msg', 'Already Registered');

              res.redirect('/users/home');
              console.log('already register');
            }else{
              User.findOne({dotaid:data_id}).then(function(result){
                var name = result.name;
                var email = result.email;
                var tradeurl = result.tradeurl;
                var mobile = result.mobile;
                var dotaid = result.dotaid;
                  console.log(name + email+tradeurl+mobile+dotaid);

                  var newReg = new Major({
                    name: name,
                    email:email,
                    tradeurl:tradeurl,
                    mobile: mobile,
                    dotaid:dotaid
                  });
                    console.log('going');
                  Major.createUser(newReg, function(err, user){
                    if(err) throw err;
                    console.log(user);
                  });

                  req.flash('success_msg', 'Registration successful');

                  res.redirect('/users/home');
              });
              console.log('Registration successful');
            }
          });
      /**/
  });



  //other one giveaway reg
router.post('/otherone',ensureAuthenticated,function(req,res){
          var data_id = req.body.di;
            One.findOne({dotaid:data_id}).then(function (result) {
              if(result){
                req.flash('error_msg', 'Already Registered');

                res.redirect('/users/home');
                console.log('already register');
              }else{
                User.findOne({dotaid:data_id}).then(function(result){
                  var name = result.name;
                  var email = result.email;
                  var tradeurl = result.tradeurl;
                  var mobile = result.mobile;
                  var dotaid = result.dotaid;
                    console.log(name + email+tradeurl+mobile+dotaid);

                    var newReg = new One({
                      name: name,
                      email:email,
                      tradeurl:tradeurl,
                      mobile: mobile,
                      dotaid:dotaid
                    });
                      console.log('going');
                    One.createUser(newReg, function(err, user){
                      if(err) throw err;
                      console.log(user);
                    });

                    req.flash('success_msg', 'Registration successful');

                    res.redirect('/users/home');
                });
                console.log('Registration successful');
              }
            });
        /**/
    });



    //other two giveaway reg
router.post('/othertwo',ensureAuthenticated,function(req,res){
            var data_id = req.body.di;
              Two.findOne({dotaid:data_id}).then(function (result) {
                if(result){
                  req.flash('error_msg', 'Already Registered');

                  res.redirect('/users/home');
                  console.log('already register');
                }else{
                  User.findOne({dotaid:data_id}).then(function(result){
                    var name = result.name;
                    var email = result.email;
                    var tradeurl = result.tradeurl;
                    var mobile = result.mobile;
                    var dotaid = result.dotaid;
                      console.log(name + email+tradeurl+mobile+dotaid);

                      var newReg = new Two({
                        name: name,
                        email:email,
                        tradeurl:tradeurl,
                        mobile: mobile,
                        dotaid:dotaid
                      });
                        console.log('going');
                      Two.createUser(newReg, function(err, user){
                        if(err) throw err;
                        console.log(user);
                      });

                      req.flash('success_msg', 'Registration successful');

                      res.redirect('/users/home');
                  });
                  console.log('Registration successful');
                }
              });
          /**/
      });


      //other three giveaway reg
      router.post('/otherthree',ensureAuthenticated,function(req,res){
              var data_id = req.body.di;
                Three.findOne({dotaid:data_id}).then(function (result) {
                  if(result){
                    req.flash('error_msg', 'Already Registered');

                    res.redirect('/users/home');
                    console.log('already register');
                  }else{
                    User.findOne({dotaid:data_id}).then(function(result){
                      var name = result.name;
                      var email = result.email;
                      var tradeurl = result.tradeurl;
                      var mobile = result.mobile;
                      var dotaid = result.dotaid;
                        console.log(name + email+tradeurl+mobile+dotaid);

                        var newReg = new Three({
                          name: name,
                          email:email,
                          tradeurl:tradeurl,
                          mobile: mobile,
                          dotaid:dotaid
                        });
                          console.log('going');
                        Three.createUser(newReg, function(err, user){
                          if(err) throw err;
                          console.log(user);
                        });

                        req.flash('success_msg', 'Registration successful');

                        res.redirect('/users/home');
                    });
                    console.log('Registration successful');
                  }
                });
            /**/
        });

//Ramp reg
router.post('/sc',ensureAuthenticated,function(req,res){
                var data_id = req.body.di;
                var dota_match = req.body.up;
                      User.findOne({dotaid:data_id}).then(function(result){
                        var name = result.name;
                        var dotaid = result.dotaid;
                          console.log(name+dotaid);

                          var newReg = new Ramp({
                            name: name,
                            dotaid:dotaid,
                            matchid:dota_match
                          });
                            console.log('going');
                          Ramp.createUser(newReg, function(err, user){
                            if(err) throw err;
                            console.log(user);
                          });

                          req.flash('success_msg', 'Registration successful');

                          res.redirect('/users/screen');
                      });
                      console.log('Successful submited');

              /**/
});


function ensureAuthenticated(req, res, next){
  		if(req.isAuthenticated()){
  			return next();
  		} else {
  			req.flash('error_msg','Please login to continue');
  			res.redirect('/users/home');
  		}
  	}

function ensureAuthenticated_two(req, res, next){
  		if(!req.isAuthenticated()){
        return next();
  		}
  		 else {

          req.flash('error_msg','You are logged in.');
    			res.redirect('/users/home');
        }
  	}

module.exports = router;
