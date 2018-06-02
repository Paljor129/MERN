const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnonceSchema = new Schema({
  villename: {
    type: String,
    required: true
  },
  villename2: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  titre: {
    type: String,
    required: true
  },
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
});

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  Annonce: AnnonceSchema
});

//create model, i call users n it gonna connect to UserSchema
mongoose.model('users', UserSchema);
