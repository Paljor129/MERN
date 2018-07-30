const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Annonce = require('./Annonce');

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  annonce: {
    type: Schema.Types.ObjectId,
    ref: 'Annonce',
    require: false
  },
  annonces: [{
    type: Schema.Types.ObjectId,
    ref: 'Annonce',
    require: false
  }]
});

//create model, i call users n it gonna connect to UserSchema
module.exports = mongoose.model('users', UserSchema);
