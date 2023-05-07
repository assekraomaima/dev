const router = require('express').Router();
const scoringController = require('../controllers/scoring.controller')
//const checkPermission = require('../middlewares/check-permission.middleware');
// checkPermission('PERMISSION_LIST_ROLES'),
router.post('/', scoringController.createScoring);
router.get('/:id', scoringController.findScoringById);
router.get('/', scoringController.findAllScoring);
router.put('/:id', scoringController.editScoring);
router.delete('/:id', scoringController.deleteScoring);

module.exports = router;