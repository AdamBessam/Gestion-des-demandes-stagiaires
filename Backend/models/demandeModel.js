const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const demandeSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dureedebut: { type: Date, required: true },
  dureefin: { type: Date, required: true },
  responsabiliteStagiaire: { type: Boolean },
  etatDemande: { type: String, enum: ['Accepter', 'Refuser', 'en attente'], required: true },
  fichiers: [{ type: String }],
  departement: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String }
});

demandeSchema.plugin(uniqueValidator);

// Formater les dates avant la sauvegarde
demandeSchema.pre('save', function (next) {
  if (this.dureedebut) {
    this.dureedebut.setUTCHours(0, 0, 0, 0);
  }
  if (this.dureefin) {
    this.dureefin.setUTCHours(0, 0, 0, 0);
  }
  next();
});

module.exports = mongoose.model('Demande', demandeSchema);
