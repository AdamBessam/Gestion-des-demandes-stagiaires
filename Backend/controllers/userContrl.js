const User = require('../models/UserModel');

const Department = require('../models/Departement');
exports.getAllUsers = (req, res) => {
    User.find()
        .populate('departement') 
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        });
};




exports.getUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .populate('departement')
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.status(200).json({ user });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        });
};


exports.createUser = async (req, res) => {
    const { nom, prenom, CIN, email,  password, role,Adresse, departement: departementNom } = req.body;

    console.log('Données reçues :', req.body); // Affiche les données reçues

    try {
        const department = await Department.findOne({ nomDepartement: departementNom });

        if (!department) {
            return res.status(404).json({ message: 'Département non trouvé' });
        }

        const generatedPassword = `${nom}@${prenom}`;

        const newUser = new User({
            nom,
            prenom,
            email,
            Adresse,
            password: generatedPassword,
            role,
            departement: department._id,
        
            CIN
        });

        const savedUser = await newUser.save();

        await Department.findByIdAndUpdate(
            department._id,
            { $push: { users: savedUser._id } },
            { new: true }
        );

        console.log('Utilisateur créé :', savedUser);
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
};


// exports.updateUser = async (req, res) => {
//     const { nom, prenom, email, role, departement } = req.body;
//     const userId = req.params.id;

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé' });
//         }

//         user.nom = nom;
//         user.prenom = prenom;
//         user.email = email;
//         user.role = role;

//         const department = await Department.findOne({ nomDepartement: departement });

//         if (!department) {
//             return res.status(404).json({ message: 'Département non trouvé' });
//         }

//         user.departement = department._id;

//         const updatedUser = await user.save();

//         console.log('Utilisateur mis à jour :', updatedUser);
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
//         res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
//     }
// };
exports.updateUser = async (req, res) => {
    const { nom, prenom, email, role, departement,Adresse } = req.body;
    const userId = req.params.id;

    try {
        // Trouvez l'utilisateur à mettre à jour
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Mettez à jour les champs de l'utilisateur
        user.nom = nom || user.nom;
        user.prenom = prenom || user.prenom;
        user.email = email || user.email; // Met à jour l'email sans vérifier l'unicité
        user.role = role || user.role;
        user.Adresse = Adresse || user.Adresse;

        // Trouvez et mettez à jour le département
        if (departement) {
            const department = await Department.findOne({ nomDepartement: departement });
            if (!department) {
                return res.status(404).json({ message: 'Département non trouvé' });
            }
            user.departement = department._id;
        }

        // Sauvegardez les modifications
        const updatedUser = await user.save();

        console.log('Utilisateur mis à jour :', updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
};


exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        await Department.updateMany(
            { users: userId }, 
            { $pull: { users: userId } } 
        );

        console.log('Utilisateur supprimé :', deletedUser);
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    }
};

exports.updatePassword = async (req, res) => {
    
    const { password } = req.body; // Le nouveau mot de passe doit être fourni dans la requête
    const userId = req.params.id;
    console.log('New password to be sent:', password);

    try {
        // Trouvez l'utilisateur à mettre à jour
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Mettez à jour le mot de passe
        user.password = password;

        // Sauvegardez les modifications
        const updatedUser = await user.save();

        console.log('Mot de passe mis à jour pour l\'utilisateur :', updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du mot de passe de l\'utilisateur' });
    }
};