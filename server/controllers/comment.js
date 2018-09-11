const express = require('express');
const router = express.Router();

const User = require('../models/user')
const Annonce = require('../models/annonce')
const Comment = require('../models/comment')

router.post('/:annonce_id/:user_id', (req, res) => {
    console.log('comment id ', req.params.annonce_id);
    
    User.findById(req.params.user_id)
        .then((user) => {
            if (!user) { return console.log('No user'); }
            
            const comment = new Comment({ comment: req.body.comment });            
            comment.auteur = user;
            console.log('comment req annonce ', req.params.annonce_id);
            comment.annonce = req.params.annonce_id;
            return comment
                .save()
                .then(comment => {
                    return Annonce.findById(req.params.annonce_id)
                })
                .then(annonce => {
                    annonce.comments.push(comment)
                    return annonce.save()
                })
                .then(() => res.json(annonce))
                .catch(err => {
                    res.json(err);
                })
        })
        .catch(err => {
            res.json(err)

        })
})

router.get('/:annonce_id/comments', (req, res) => {
    Annonce
        .findById(req.params.annonce_id)
        .populate({
            path: 'comments',
            populate: [
                { path: 'auteur' }
            ]
        })
        .then(annonce => {
            console.log('annonce get ', annonce)
            res.json(annonce)
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router