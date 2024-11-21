const express = require('express');
const router = express.Router();
const hechizosController = require('../controllers/hechizosController');

// Rutas para los hechizos
router.get("/", hechizosController.getHechizos);
router.get("/:id", hechizosController.getHechizosById);
router.post ("/", hechizosController.createHechizos);
router.put("/:id", hechizosController.updateHechizos);
router.delete("/:id", hechizosController.deleteHechizos);

module.exports = router;