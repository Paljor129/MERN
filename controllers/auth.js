const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

// const {ensureAuthenticated} = require('../helpers/auth')

const user = require("../models/User");
const User = mongoose.model("users");

const annonce = require('../models/Annonce');
const Annonce = mongoose.model("annonces");

//passport config
require('../config/passport')(passport)

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
                res.json(user)
            })
            .catch(err => {
                console.log(err)
            })
      })
  })

});

//To get all users
router.get('/users', (req, res) => {
    User
        .find({})
        // .populate('annonce')
        // .exec()
        .then(users => {
            // Annonce
            //     .find({})
            //     .then(annonces => {
            //         res.render('user/index', {
            //             user: user
            //         })
            //     })
            res.json(users)
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/user/:_id', (req, res) => {
    console.log("ppppppppp ", req.params._id);
    User
        .findById(req.params._id)
        // .populate('Annonce')
        .then(user => {
            res.json(user)
            console.log(user);
             
        })
        .catch(err => {
            console.log(err);
        })
})


//passport middleware
const passportMiddleware = passport.authenticate('local', {
    session: false
})

router.post('/login', passportMiddleware, (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;
    res.json(req.user)
})

// router.post('/login', (req, res, next) => {
//     passport.authenticate('local')
//     (req, res, next)
// })


module.exports = router