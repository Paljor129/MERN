const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {
        type: String,
        trim: true
    },
    auteur: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    annonce: {
        type: Schema.Types.ObjectId,
        ref: 'Annonce'
    },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);