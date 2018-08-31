const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const auth = require('../helpers/auth');
const dotenv = require('dotenv')

dotenv.config()

const User = require("../models/User");
const Annonce = require('../models/Annonce');

const googleMapsClient = require('@google/maps').createClient({ 
    key : process.env.GOOGLEMAPS_API_KEY
})

router.post('/', auth.ensureAuthenticated, (req, res) => {
    const { address, location, period, titre, image, description, auteur } = req.body;
    const annonce = new Annonce({address, location, period, titre, image, description, auteur: auteur });
    googleMapsClient.geocode({
        address: annonce.address
    }, ((err, response) => {
        if(err) {
            res.json(err);
        }else {
            annonce.location.coordinates = [response.json.results[0].geometry.location.lng, response.json.results[0].geometry.location.lat]
            return annonce
                .save()
                .then(annonce => {
                    return User.findById(auteur)
                })
                .then(user => {
                    return user.update({annonce: (annonce._id)})
                })
                .then(() => res.json(annonce))
                .catch(err => {
                    res.json(err);
                })
        }
    }))

    
})

router.get('/:_id/match', (req, res) => {
    User
        .findOne({ _id: req.params._id })
        .populate('annonce')
        .then(user => {
            console.log("user prrrrr ", user);
            Annonce
                .find({
                    location : {
                        $near: {
                            $geometry: {
                                type: 'Point',
                                coordinates: [user.location.coordinates[0], user.location.coordinates[1]]
                            },
                            $maxDistance: 5000
                        }
                    }
                })
                .populate('auteur')
                .then(annonces => {
                    const auteurIds = annonces.map((ann) => ann.auteur._id)
                    return User

                        .find({
                            _id: { $in: auteurIds },
                            location: {
                                $near: {
                                    $geometry: {
                                        type: "Point",
                                        coordinates: [user.annonce.location.coordinates[0], user.annonce.location.coordinates[1]]
                                    },
                                    $maxDistance: 5000
                                }
                            }
                        })
                        .populate('annonce')
                })
                .then(users => {
                    res.json(users.map( u => u.annonce))
                })
                .catch(err => {
                    res.json(err);
                })
        })
        .catch(err => {
            res.json(err);
        })

})

router.get('/', (req, res) => {
    Annonce
        .find({})
        .populate('auteur')
        .then(annonces => {
            res.json(annonces)
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/:_id/pop', (req, res) => {
    Annonce
        .findById(req.params._id)
        .populate('auteur')
        .then(annonce => {
            res.json(annonce)
        })
        .catch(err => {
            res.json(err);
        })
})

router.put('/:id', (req, res) => {
    Annonce
        .findByIdAndUpdate(req.params.id, { $set : req.body}, { new: true })
        .then(annonce => {
            res.json(annonce)
        })
        .catch(err => {
            res.json(err);
        })
})

router.put('/:id/interested', (req, res) => {

    const userPromise = User
        .findOne(
            {_id: req.body.user_id}
        )
        .then(user => {
            user.annonces.push(req.params.id)
        return user.save()
        })

    const annoncePromise = Annonce
        .findOne(
            {_id: req.params.id},
        )
        .then(annonce => {
            annonce.users.push(req.body.user_id)
        return annonce.save()
        })

    Promise.all([userPromise, annoncePromise])
        .then(values => {
            res.json(values);
        })
})

router.get('/:id', (req, res) => {
    Annonce
        .findById(req.params.id)
        .populate({
            path: 'users',
            populate: [
                {path: 'annonce'}
            ]
        })
        .then(annonce => {
            res.json(annonce)
        }).catch(err => {
            res.json(err);
        })

})

router.delete('/:id/:user_id', (req, res) => {
    const userPromise = User
        .update({ _id: req.params.user_id }, { $pull: { annonces: mongoose.Types.ObjectId(req.params.id) } })

    const annoncePromise = Annonce
        .update({ _id: req.params.id }, { $pull: { users: mongoose.Types.ObjectId(req.params.user_id) } })

    Promise.all([userPromise, annoncePromise])
        .then(values => {
            res.json(values)
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router