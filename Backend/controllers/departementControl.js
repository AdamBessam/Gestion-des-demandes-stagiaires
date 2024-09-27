const Department = require('../models/Departement');
const Demande = require('../models/demandeModel'); 
const User = require('../models/UserModel');

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('demandes').populate('users');
        res.status(200).json(departments);
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getDepartmentById = async (req, res) => {
    const { departmentId } = req.params;

    try {
        const department = await Department.findById(departmentId).populate('demandes').populate('users');
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.status(200).json(department);
    } catch (error) {
        console.error('Error fetching department by ID:', error);
        res.status(500).json({ error: 'Error fetching department by ID' });
    }
};




exports.createDepartment = async (req, res) => {
    const { nomDepartement } = req.body;

    try {
        // Vérifier si le département existe déjà
        const existingDepartment = await Department.findOne({ nomDepartement });
        if (existingDepartment) {
            return res.status(400).json({ message: 'Ce département existe déjà' });
        }

        // Créer un nouveau département
        const newDepartment = new Department({
            nomDepartement,
            // Autres champs du département à ajouter ici si nécessaire
        });

        // Sauvegarder le département dans la base de données
        const savedDepartment = await newDepartment.save();

        res.status(201).json(savedDepartment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
