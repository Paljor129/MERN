const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User')

//create schema
const AnnonceSchema = new Schema({
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type: Number,
            require: 'true'
        }],
        address: {
            type: String,
            require: true
        }
    },
    location1: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type: Number,
            require: 'true'
        }],
        address: {
            type: String,
            require: true
        }
    },
    period: {
        type: String,
        required: true,
        trim: true
    },
    titre: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    auteur: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: false
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: false
    }]
});

//create my model, i call ideas n it gonna connect to AnnonceSchema
module.exports = mongoose.model('annonces', AnnonceSchema);