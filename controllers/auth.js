const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const router = express.Router()

const user = require("../models/User")
// const annonce = require("../models/User")
const User = mongoose.model("users");
// const Annonce = mongoose.model("users");

router.post('/register', (req, res) => {
    console.log(req.body)
  const { firstname, lastname, email, password } = req.body;
  const role = "user";
  //To create a User
  const user = new User({ firstname, lastname, email, password })

  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
          if(err) throw err;
          user.password = hash;
          user
            .save()
            .then(user => {
                //to add in front
                // req.flash('sucess message', 'You are now registered and can log in')
                // res.redirect('/login')
                res.json({success: true})
            })
            .catch(err => {
                console.log(err)
            })
      })
  })

});

//passport middleware
const passportMiddleware = passport.authenticate('local', {
    session: false
})

router.post('/login', passportMiddleware, (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;
    res.json(req.user)
})

router.get('/logout', (req, res) => {
    req.logout();
})

router.post('/createAnnonce', (req, res) => {
    const {villename, villename2, period, titre} = req.body
    const role = "annonce"

    const annonce = new Annonce({ villename, villename2, period, titre })

})

module.exports = router