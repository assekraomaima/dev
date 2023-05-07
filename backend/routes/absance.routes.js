const router = require('express').Router();
const absanceController = require('../controllers/absance.controller')

router.post('/', absanceController.createAbsance);
router.get('/:id', absanceController.findAbsanceById);
router.get('/', absanceController.findAllAbsance);
router.put('/:id', absanceController.editAbsance);
router.delete('/:id', absanceController.deleteAbsance);

module.exports = router;
