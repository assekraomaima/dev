const router = require('express').Router();
const CarController = require('../controllers/car.controller');
const isAuthenticated = require('../middlewares/is-authenticated.middleware');

router.post('/', CarController.createCar);
router.get('/:id', CarController.findCarById);
router.get('/', CarController.findAllCar);
router.put('/:id', CarController.editCar);
router.delete('/:id', CarController.deleteCar);




module.exports = router;