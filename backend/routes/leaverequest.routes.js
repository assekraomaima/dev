const router = require('express').Router();
const leaverequestController = require('../controllers/leaverequest.controller');
const isAuthenticated = require('../middlewares/is-authenticated.middleware');
router.post('/', leaverequestController.createLeaveRequest);
router.get('/my-leaverequest',isAuthenticated, leaverequestController.findMyLeaveRequest);
router.get('/', leaverequestController.findAllLeaveRequest);
router.get('/:id', leaverequestController.findLeaveRequestById);
router.put('/:id',isAuthenticated, leaverequestController.editLeaveRequest);
router.delete('/:id', leaverequestController.deleteLeaveRequest);


module.exports = router;