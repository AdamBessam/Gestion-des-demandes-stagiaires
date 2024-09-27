const express = require('express');
const Router = express.Router();
const DepartementCntrl=require('../controllers/departementControl');


Router.get('/getDepartements', DepartementCntrl.getAllDepartments);
Router.get('/getDepartement/:id', DepartementCntrl.getDepartmentById);
Router.post('/creer',DepartementCntrl.createDepartment);


module.exports = Router;