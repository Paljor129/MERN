const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../helpers/auth');
const dotenv = require('dotenv')

dotenv.config()

const User = require("../models/User");
const Annonce = require('../models/Annonce');

const googleMapsClient = require('@google/maps').createClient({ 
    key : process.env.GOOGLEMAPS_API_KEY
})

router.post('/annonce', (req, res) => {
    const { address, location, period, titre, image, description, auteur } = req.body;
    
    //je stoke l'auteur quand je crée une annonce
    const annonce = new Annonce({address, location, period, titre, image, description, auteur: auteur });

    googleMapsClient.geocode({
        address: annonce.address
    }, ((err, response) => {
        if(err) {
            res.json(err);
        }else {
            console.log('response address of annonce : ', JSON.stringify(response.json.results))
            annonce.location.coordinates = [response.json.results[0].geometry.location.lng, response.json.results[0].geometry.location.lat]

            return annonce
                .save()
                //je cherche l'auteur
                .then(annonce => {
                    console.log("create annonce : ", annonce);
                    console.log("create auteur : ", auteur);
                    return User.findById(auteur)
                })
                //je fais la mise à jour de l'annonce id dans le user
                .then(user => {
                    console.log("create user", user);
                    return user.update({annonce: (annonce._id)})
                })
                //Here res is the response from server to get annonce
                .then(() => res.json(annonce))
                .catch(err => {
                    console.log(err);
                })
        }
    }))

    
})

router.get('/user/:_id/match', (req, res) => {

    User
        .findOne({ _id: req.params._id })
        .populate('annonce')
        .then(user => {
            console.log("user prrrrr ", user);
            Annonce

                .find({
                    // id: { $in: annonceIds },
                    // 'auteur.address' : {$text: user.annonce.address},
                    // 'auteur.location': {
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
                    console.log('To verify annonces : ', annonces.map((a) => a.titre))
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
                    console.log('match : ', users)
                    res.json(users.map( u => u.annonce))
                })
                .catch(err => {
                    console.log("annonces error : ",err);
                    res.json(err);
                })
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })

})

router.get('/annonces', (req, res) => {
    Annonce
        .find({})
        .populate('auteur')
        .then(annonces => {
            res.json(annonces)
        })
        .catch(err => {
            console.log(err);
        })

})

router.get('/annonce/:_id/pop', (req, res) => {
    Annonce
        .findById(req.params._id)
        .populate('auteur')
        .then(annonce => {
            res.json(annonce)
            console.log(annonce);

        })
        .catch(err => {
            console.log(err);
            assert.isNotOk(error, 'Promise error');
            done();
        })
})

//to edit an annonce
router.put('/annonce/:id', (req, res) => {
    Annonce
        .findByIdAndUpdate(req.params.id, { $set : req.body}, { new: true })
        .then(annonce => {
            res.json(annonce)
            console.log('annonce modifier : ',annonce);
        })
        .catch(err => {
            res.json(err);
        })
})

//to push annonce_id in users collection & user_id in annonces collection
router.put('/annonce/:id/interested', (req, res) => {

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

//Pass an array of objects with properties to be populated
router.get('/annonce/:id', (req, res) => {
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
            console.log(err);
        })

})

router.delete('/annonce/:id', (req, res) => {
    const userPromise = User
    .findByIdAndUpdate({ _id: req.body.user_id }, { $pullAll: { annonces: [req.params.id] } })

    const annoncePromise = Annonce
    .findByIdAndUpdate({ _id: req.params.id }, { $pullAll: { users: [req.body.user_id] } })

    Promise.all([userPromise, annoncePromise])
        .then(values => {
            console.log('delete interest : ', values);
            res.json(values)
        })
})

module.exports = router