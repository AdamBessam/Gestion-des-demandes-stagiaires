const Demande = require('../models/demandeModel');

const Department=require('../models/Departement');
const User=require('../models/UserModel')
const path = require('path');

exports.createDemande = async (req, res) => {
    const { nom, prenom, email, dureedebut, dureefin, responsabiliteStagiaire, etatDemande, departement, user } = req.body;

    // Extraire uniquement le nom du fichier à partir de file.path
    const fichiers = req.files ? req.files.map(file => path.basename(file.path)) : [];

    try {
        const department = await Department.findOne({ nomDepartement: departement });

        if (!department) {
            return res.status(404).json({ message: 'Département non trouvé' });
        }

        const nouvelleDemande = new Demande({
            nom,
            prenom,
            email,
            dureedebut,
            dureefin,
            responsabiliteStagiaire,
            etatDemande,
            departement: department._id,
            user,
            fichiers
        });

        const demandeCree = await nouvelleDemande.save();

        await Department.findByIdAndUpdate(
            department._id,
            { $push: { demandes: demandeCree._id } },
            { new: true }
        );

        res.status(201).json(demandeCree);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// exports.createDemande = async (req, res) => {
//     const { nom, prenom, email, dureedebut, dureefin, responsabiliteStagiaire, etatDemande, departement, user } = req.body;
//     const fichiers = req.files ? req.files.map(file => `${file.path}`) : [];

//     try {
//         const department = await Department.findOne({ nomDepartement: departement });

//         if (!department) {
//             return res.status(404).json({ message: 'Département non trouvé' });
//         }

//         const nouvelleDemande = new Demande({
//             nom,
//             prenom,
//             email,
//             dureedebut,
//             dureefin,
//             responsabiliteStagiaire,
//             etatDemande,
//             departement: department._id,
//             user,
//             fichiers
//         });

//         const demandeCree = await nouvelleDemande.save();

//         await Department.findByIdAndUpdate(
//             department._id,
//             { $push: { demandes: demandeCree._id } },
//             { new: true }
//         );

//         res.status(201).json(demandeCree);
//     } catch (err) {
  
//         res.status(500).json({ message: err.message });
//     }
// };

exports.updateDemande = async (req, res) => {
    const demandeId = req.params.id;
    const updates = req.body;
    const fichiers = req.files ? req.files.map(file => `${file.path}`) : [];


    try {
        if (updates.departement && typeof updates.departement === 'string') {
            const department = await Department.findOne({ nomDepartement: updates.departement });

            if (!department) {
                return res.status(404).json({ message: 'Le département spécifié n\'existe pas' });
            }

            if (!department.demandes.includes(demandeId)) {
                department.demandes.push(demandeId);
                await department.save();
            }

            updates.departement = department._id;
        }

        // Inclure les fichiers téléversés dans les mises à jour
        if (fichiers.length > 0) {
            updates.fichiers = fichiers;
        }

        const demandeMiseAJour = await Demande.findByIdAndUpdate(demandeId, updates, { new: true });

        if (!demandeMiseAJour) {
            return res.status(404).json({ message: 'Demande non trouvée' });
        }

        res.status(200).json(demandeMiseAJour);
    } catch (err) {
        
        res.status(500).json({ message: err.message });
    }
};

// exports.createDemande = async (req, res) => {
//     const { nom, prenom, email, dureedebut,dureefin, responsabiliteStagiaire, etatDemande, departement,  user,fichiers } = req.body;
//     // const { nom, prenom, email, dureedebut,dureefin, etatDemande, departement, user } = req.body;

//     try {
//         const department = await Department.findOne({ nomDepartement: departement });
        

//         if (!department) {
//             return res.status(404).json({ message: 'Département non trouvé' });
//         }

 

//         const nouvelleDemande = new Demande({
//             nom,
//             prenom,
//             email,
//             dureedebut,
//             dureefin,
//             responsabiliteStagiaire,
//             etatDemande,
//             departement: department._id,
//             user: user,
//             fichiers
//         });


//         const demandeCree = await nouvelleDemande.save();

//         await Department.findByIdAndUpdate(
//             department._id,
//             { $push: { demandes: demandeCree._id } },
//             { new: true }
//         );

//         res.status(201).json(demandeCree);
//     } catch (err) {
      
//         res.status(500).json({ message: err.message });
//     }
// };


exports.getAllDemandes = async (req, res) => {
    try {
        const demandes = await Demande.find().populate('departement').populate('user');
        res.status(200).json(demandes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDemandeById = async (req, res) => {
    const demandeId = req.params.id;

    try {
        const demande = await Demande.findById(demandeId).populate('departement').populate('user');
        if (!demande) {
            return res.status(404).json({ message: 'Demande non trouvée' });
        }
        res.status(200).json(demande);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// exports.updateDemande = async (req, res) => {
//     const demandeId = req.params.id;
//     const updates = req.body;

//     try {
//         // Vérifier si le nom du département est fourni dans les mises à jour
//         if (updates.departement && typeof updates.departement === 'string') {
//             // Trouver le département correspondant au nom
//             const department = await Department.findOne({ nomDepartement: updates.departement });

//             if (!department) {
//                 return res.status(404).json({ message: 'Le département spécifié n\'existe pas' });
//             }

//             // Vérifier si l'ID de la demande n'existe pas déjà dans le département
//             if (!department.demandes.includes(demandeId)) {
//                 department.demandes.push(demandeId);
//                 await department.save();
//             }

//             // Mettre à jour les informations de la demande avec l'ID du département
//             updates.departement = department._id;
//         }

//         // Mettre à jour la demande avec les nouvelles informations
//         const demandeMiseAJour = await Demande.findByIdAndUpdate(demandeId, updates, { new: true });

//         if (!demandeMiseAJour) {
//             return res.status(404).json({ message: 'Demande non trouvée' });
//         }

//         // Répondre avec la demande mise à jour
//         res.status(200).json(demandeMiseAJour);
//     } catch (err) {
//         // Gérer les erreurs
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.updateDemande = async (req, res) => {
//     const demandeId = req.params.id;
//     const updates = req.body;

//     try {
//         // Vérifier si le département est fourni dans les mises à jour et est une chaîne de caractères
//         if (updates.departement && typeof updates.departement === 'string') {
//             // Vérifier si le département existe déjà dans la base de données
//             const department = await Department.findOne({ nomdeDepartemnt: updates.nomDepartement });

//             if (!department) {
//                 return res.status(404).json({ message: 'Le département spécifié n\'existe pas' });
//             }

//             // Vérifier si l'ID de la demande n'existe pas déjà dans le département
//             if (!department.demandes.includes(demandeId)) {
//                 department.demandes.push(demandeId);
//                 await department.save();
//             }

//             updates.departement = department._id;
//         }

//         const demandeMiseAJour = await Demande.findByIdAndUpdate(demandeId, updates, { new: true });

//         if (!demandeMiseAJour) {
//             return res.status(404).json({ message: 'Demande non trouvée' });
//         }

//         res.status(200).json(demandeMiseAJour);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


exports.deleteDemande = async (req, res) => {
    const demandeId = req.params.id;

    try {
        const demandeSupprimee = await Demande.findByIdAndDelete(demandeId);
        if (!demandeSupprimee) {
            return res.status(404).json({ message: 'Demande non trouvée' });
        }

     
        const department = await Department.findOneAndUpdate(
            { demandes: demandeId },
            { $pull: { demandes: demandeId } },
            { new: true }
        );

        if (!department) {
            return res.status(404).json({ message: 'Département non trouvé pour retirer la demande' });
        }

        res.status(204).json({ message: 'Demande et fichiers associés supprimés avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.updateEtatDemande = async (req, res) => {
    const demandeId = req.params.id;
    const { etatDemande, message } = req.body;

    // Vérifie si l'état est valide
    if (!['Accepter', 'Refuser', 'en attente'].includes(etatDemande)) {
        return res.status(400).json({ message: 'Etat de demande invalide' });
    }

    try {
        const demande = await Demande.findById(demandeId);

        if (!demande) {
            return res.status(404).json({ message: 'Demande non trouvée' });
        }

        demande.etatDemande = etatDemande;

        // Met à jour l'attribut message s'il est fourni dans la requête
        if (message) {
            demande.message = message;
        }

        const updatedDemande = await demande.save();

        res.status(200).json({ message: 'Etat de demande mis à jour avec succès', demande: updatedDemande });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'état de la demande', error: err.message });
    }
};
