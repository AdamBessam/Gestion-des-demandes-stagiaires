const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const { auth } = require('./Middleware/auth');

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());



mongoose.connect(process.env.DBURI)
.then(()=>{console.log('connexion reussi !!!!')})
.catch((error)=>{console.log(error)});

const JWT_SECRET = process.env.JWT_SECRET;

app.get('/api/protected', auth, (req, res) => {

    jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: 'Token is not valid' });
        } else {
            res.json({ msg: 'Welcome to the protected route!', user: decoded.user });
        }
    });
});


app.use('/api/auth', authRoutes);


const userRouter=require('../Backend/routes/UserRt');
const demandeRouter=require('../Backend/routes/demandeRts');
const departmentRouter=require('../Backend/routes/departementRts');
const path = require('path');
app.use('/api/users',userRouter);
app.use('/api/demandes',demandeRouter);
app.use('/api/department',departmentRouter);
const filesDirectory = path.join('C:', 'Users', 'Dell Latitude 3420', 'Desktop', 'Projet stage', 'create-react-app', 'Fichier');

// Servir les fichiers statiques depuis le répertoire 'Fichier'
app.use('/fichiers', express.static(filesDirectory));


// app.post('/api/upload', upload.single('file'), async (req, res) => {
//     try {
//       const file = req.file;
//       if (!file) {
//         return res.status(400).send({ message: 'No file uploaded' });
//       }
  
//       // Enregistrer le nom du fichier dans la base de données
//       const demande = new Demande({
//         // Ajoutez d'autres champs de la demande ici
//         fichiers: [file.filename] // Enregistre seulement le nom du fichier
//       });
  
//       await demande.save();
  
//       res.status(200).send({ message: 'File uploaded successfully', file: file.filename });
//     } catch (error) {
//       res.status(500).send({ message: 'Error uploading file', error });
//     }
//   });

module.exports = app;