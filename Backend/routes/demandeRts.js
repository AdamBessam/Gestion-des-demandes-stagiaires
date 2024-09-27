const express = require('express');
const router = express.Router();
const DemandeCntrl = require('../controllers/demandeContrl');
const upload = require('../Middleware/uploadMiddleware'); // Assurez-vous que le chemin est correct

router.post('/createDemande', upload.array('fichiers', 10), DemandeCntrl.createDemande);
router.get('/getDemandes', DemandeCntrl.getAllDemandes);
router.get('/getDemande/:id', DemandeCntrl.getDemandeById);
router.put('/updateDemande/:id', upload.array('fichiers', 10), DemandeCntrl.updateDemande);
router.delete('/deleteDemande/:id', DemandeCntrl.deleteDemande);
router.put('/gererEtat/:id', DemandeCntrl.updateEtatDemande);

module.exports = router;
