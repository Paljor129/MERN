const LocalStrategy = require('passport-local')
.Strategy;
const bcrypt = require('bcryptjs');
const User = require("../models/User");

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User
          .findOne({ email: email })
          .populate('annonce')
          .then(user => {
            if (!user) {
              return done(null, false, {message: 'No user found'});
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, {
                      message: "Password Incorrect"
                    });
                }
            })
        })
        .catch(err => {
          res.status(401).send("Vous êtes pas autorisé")
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