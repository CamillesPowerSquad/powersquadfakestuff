var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var User = require('./../models/userModel');

module.exports = function(passport){
  passport.serializeUser(function(user, done){
    // console.log("User:", user);
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done){
    // console.log("Id:", id);
    User.findOne({
      where: {id: id}
    }).then(function(user){
      done(user);
    });
  });
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },function(req, email, password, done){
    process.nextTick(function(){
      User.findOne({
        where: {email: email}
      }).then(function(user){
        if(user){
          if(bcrypt.compareSync(password, user.password)){
            console.log(user.name + " is logged in");
            return done(null, user);
          } else {
            console.log("password is incorrect");
            return done(null, false);
          }
        } else {
          var newUser = req.body;
          newUser.email = email;
          newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
          User.create(newUser)
          .then(function(result, err){
            if(err){
              console.log("missing info");
              return done(null, false);
            } else {
              return done(null, result);
            }
          })
        }
      })
    });
  }));
};





//
