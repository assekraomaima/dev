const router = require('express').Router();
const WorkPermitController = require('../controllers/workpermit.controller');
router.post('/', WorkPermitController.createWorkpermit);
router.get('/:id', WorkPermitController.findWorkpermitById);
router.get('/', WorkPermitController.findAllWorkpermit);
router.put('/:id', WorkPermitController.editWorkpermit);
router.delete('/:id', WorkPermitController.deleteWorkpermit);

module.exports = router;