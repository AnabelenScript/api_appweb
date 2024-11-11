const express = require('express');
const router = express.Router();
const zapatosController = require('../controllers/zapatos');

// Rutas para los endpoints CRUD
router.get('/', zapatosController.getAllzapatos);
router.post('/', zapatosController.addShoe);
router.put('/:id', zapatosController.updateShoe);
router.delete('/:id', zapatosController.deleteShoe);

module.exports = router;



