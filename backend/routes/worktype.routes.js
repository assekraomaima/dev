const router = require('express').Router();
const worktypeController = require('../controllers/worktype.controller');
const isAuthenticated = require('../middlewares/is-authenticated.middleware');

router.post('/', worktypeController.createWorktype);
router.get('/my-mission', isAuthenticated, worktypeController.findMyWorktypes);
router.get('/:id', worktypeController.findWorktypeById);
router.get('/', worktypeController.findAllWorktype);
router.put('/:id',isAuthenticated, worktypeController.editWorktype);
router.delete('/:id', worktypeController.deleteWorktype);
module.exports = router;