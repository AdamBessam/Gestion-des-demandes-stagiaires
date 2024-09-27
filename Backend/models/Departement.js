const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    nomDepartement: {type: String,required: true,unique: true },
    demandes: [{ type: mongoose.Schema.Types.ObjectId,ref: 'Demande'}],
    users: [{ type: mongoose.Schema.Types.ObjectId,ref: 'User'}],
    image:{type:String}
});

// Création du modèle de département
const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
