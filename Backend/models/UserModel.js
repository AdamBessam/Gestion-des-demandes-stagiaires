const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
   
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    CIN: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    Adresse: { type: String, required: true },
    role: { type: String, enum: ['admin','moderator','employee'] },
    departement:{type: mongoose.Schema.Types.ObjectId,ref: 'Department'}
    
  });

  userSchema.plugin(uniqueValidator);

  module.exports = mongoose.model('User', userSchema);