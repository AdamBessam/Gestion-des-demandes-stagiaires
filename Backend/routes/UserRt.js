const express = require('express');
const Router = express.Router();
const UserCntrl=require('../controllers/userContrl');


Router.get('/getUsers', UserCntrl.getAllUsers);
Router.get('/getUser/:id', UserCntrl.getUser);
Router.put('/updateUser/:id', UserCntrl.updateUser);
Router.post('/createUser', UserCntrl.createUser);
Router.delete('/deleteUser/:id',UserCntrl.deleteUser);
Router.put('/update-password/:id',UserCntrl.updatePassword);


module.exports = Router;