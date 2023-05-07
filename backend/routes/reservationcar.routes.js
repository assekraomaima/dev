const router = require('express').Router();
const ReservationCarController = require('../controllers/reservationcar.controller');
const isAuthenticated = require('../middlewares/is-authenticated.middleware');

router.post('/',isAuthenticated, ReservationCarController.createReservationCar);
router.get('/my-ReservationCar',isAuthenticated, ReservationCarController.findMyReservationCar);
router.get('/:id', ReservationCarController.findReservationCarById);
router.get('/', ReservationCarController.findAllReservationCar);
router.put('/:id', ReservationCarController.editReservationCar);
router.delete('/:id', ReservationCarController.deleteReservationCar);
router.post('/demande/:id/accepter', ReservationCarController.accepterReservationCar);
router.post('/demande/:id/refuser', ReservationCarController.refuserReservationCar);



module.exports = router;