const LocalStrategy = require('passport-local')
.Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const user = require("../models/User");

//load user model
const User = mongoose.model('users');

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        //Match user
        User.findOne({ email: email }).then(user => {
          if (!user) {
            //error null, user false and message
            return done(null, false, {message: 'No user found'});
          }
          console.log(user) 

          //Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
              if(err) throw err;
              if(isMatch) {
                  return done(null, user)
              } else {
                  return done(null, false, {
                    message: "Password Incorrect"
                  });
              }
              console.log(user.password)
          })
        });
    }))

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
}