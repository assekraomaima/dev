const router = require('express').Router();
const materielController = require('../controllers/material.controller');
const isAuthenticated = require('../middlewares/is-authenticated.middleware');

router.post('/',isAuthenticated, materielController.createMaterial);
router.get('/:id', materielController.findMaterialById);
router.get('/', materielController.findAllMaterial);
router.put('/:id', materielController.editMaterial);
router.delete('/:id', materielController.deleteMaterial);




module.exports = router;