// moduli express
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// mapping delle rotte.
router.post('/edit', userController.editProfile);
router.get('/profile', userController.getProfile);

module.exports = router;