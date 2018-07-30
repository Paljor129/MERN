const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const user = require("../models/User");
const User = mongoose.model("users");

const annonce = require('../models/Annonce');
const Annonce = mongoose.model("annonces");

router.post('/createannonce', (req, res) => {    
    const { location, location1, period, titre, auteur } = req.body;
    const role = "annonce";
    console.log(req.body);
    
    //je stoke l'auteur quand je crée une annonce
    const annonce = new Annonce({location, location1, period, titre, auteur: auteur });
    annonce
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
})

//find an annonce with user id
router.get('/getannonce/:_userId', (req, res) => {
    Annonce
        .findById(req.params._userId)
        .populate('auteur')
        .exec(
            (err, annonce) => {
            if(err) return handleError(err);
            res.json(annonce)
            console.log('Populated annonce ', annonce);
        })
})

router.get('/getannonce', (req, res) => {
    Annonce
        .find({})
        .then(annonces => {
            res.json(annonces)
        })
        .catch(err => {
            console.log(err);
        })

})

module.exports = router