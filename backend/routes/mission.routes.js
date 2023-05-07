const router = require('express').Router();
const missionController = require('../controllers/mission.controller');
const isAuthenticated = require('../middlewares/is-authenticated.middleware');


router.post('/', missionController.createMission);
router.get('/my-mission', isAuthenticated, missionController.findMyMissions);
router.get('/:id', missionController.findMissionById);
router.get('/', missionController.findAllMission);
router.put('/:id',isAuthenticated, missionController.editMission);
router.delete('/:id', missionController.deleteMission);
module.exports = router;