const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const auth = require('../helpers/auth');
const dotenv = require('dotenv')

dotenv.config()

const User = require('../models/User');

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLEMAPS_API_KEY
})

router.post('/register', (req, res) => {
  const { firstname, lastname, email, password, address, location, image } = req.body;
  const user = new User({ firstname, lastname, email, password, address, location, image })
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
          if(err) throw err;
          user.password = hash;
          googleMapsClient.geocode({
                address: user.address
            }, ((err, response) => {
                if (err) {
                    res.json(err);
                } else {
                    user.location.coordinates = [response.json.results[0].geometry.location.lng, response.json.results[0].geometry.location.lat]
                    return user
                        .save()
                        .then(user => {
                            res.json(user)
                        })
                        .catch(err => {
                            res.json(err)
                        })
                }
            })
      )
    })
  })    
});

router.get('/users', (req, res) => {
    User
        .find({})
        .populate('annonce')
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.json(err);
        })
})

router.get('/user/:_id', (req, res) => {
    User
        .findById(req.params._id)
        .populate('annonce')
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.json(err);
        })
})

const passportMiddleware = passport.authenticate('local', {
    session: true
})

router.post('/login', passportMiddleware, (req, res) => {
    const { email, password } = req.body;
    res.json(req.user)
    // if (info) return res.send(info)
})

router.put('/user/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router