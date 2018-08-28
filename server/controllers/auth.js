const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const ensureAuthenticated = require('../helpers/auth')
const dotenv = require('dotenv')

dotenv.config()

const User = require('../models/User');
//passport config
require('../config/passport')(passport)

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
                    console.log('error error : ',err)
                } else {
                    console.log('response address ', JSON.stringify(response.json.results))
                    user.location.coordinates = [response.json.results[0].geometry.location.lng, response.json.results[0].geometry.location.lat]
                    console.log('user location', user.location);

                    return user
                        .save()
                        .then(user => {
                            res.json(user)
                        })
                        .catch(err => {
                            res.json(err)
                            console.log(err)
                        })
                }
            })
      )
    })
  })    
});

//To get all users
router.get('/users', (req, res) => {
    User
        .find({})
        .populate('annonce')
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            console.log(err);
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

router.put('/user/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then(user => {
            res.json(user)
            console.log('user Profile : ',user)
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router