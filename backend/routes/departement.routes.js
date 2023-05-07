const router = require('express').Router();
const departementController = require('../controllers/departement.controller')
router.post('/', departementController.createDepartement);
router.get('/:departementId', departementController.findDepartementById);
router.get('/', departementController.findAllDepartement);
router.put('/:departementId', departementController.editDepartement);
router.delete('/:departementId', departementController.deleteDepartement);


module.exports = router;