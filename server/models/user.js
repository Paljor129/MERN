const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {type: String, required: true, trim: true},
  lastname: {type: String, required: true, trim: true},
  email: {type: String, unique: true, required: true, trim: true},
  password: {type: String, required: true },
  address: {type: String, require: true},
  location: {
    type: { type: String,  default: 'Point' },
    coordinates: [ Number, Number ]
  },
  image: {type: String, required: true},
  date: {type: Date, default: Date.now},
  annonce: {type: Schema.Types.ObjectId, ref: 'Annonce',required: false},
  annonces: [{type: Schema.Types.ObjectId, ref: 'Annonce',required: false}]
});
UserSchema.index({ location: '2dsphere' })

module.exports = mongoose.model('User', UserSchema);
