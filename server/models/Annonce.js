const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnonceSchema = new Schema({
    address: {type: String, require: true},
    location: {
        type: {type: String, default: 'Point'},
        coordinates: [Number, Number]
    },
    period: {type: String, required: true, trim: true},
    titre: {type: String, required: true, trim: true},
    image: {type: String, required: true},
    description: {type: String, required: true, trim: true},
    date: {type: Date, default: Date.now},
    auteur: {type: Schema.Types.ObjectId, ref: 'User', require: false},
    users: [{type: Schema.Types.ObjectId, ref: 'User', require: false}]
});
AnnonceSchema.index({location: '2dsphere'})

module.exports = mongoose.model('Annonce', AnnonceSchema);