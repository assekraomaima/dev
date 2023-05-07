const router = require('express').Router();
const ReservationMaterialController = require('../controllers/reservationmaterial.controller');
const isAuthenticated = require('../middlewares/is-authenticated.middleware');

router.post('/',isAuthenticated, ReservationMaterialController.createReservationMaterial);
router.get('/my-ReservationMaterial',isAuthenticated, ReservationMaterialController.findMyReservationMaterial);
router.get('/:id', ReservationMaterialController.findReservationMaterialById);
router.get('/', ReservationMaterialController.findAllReservationMaterial);
router.put('/:id', ReservationMaterialController.editReservationMaterial);
router.delete('/:id', ReservationMaterialController.deleteReservationMaterial);
router.post('/demande/:id/accepter', ReservationMaterialController.accepterReservationMaterial);
router.post('/demande/:id/refuser', ReservationMaterialController.refuserReservationMaterial);
router.post('/affecter', ReservationMaterialController.affecterMaterial);


module.exports = router;