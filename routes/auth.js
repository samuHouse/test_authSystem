// moduli express
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Per manipolare i percorsi dei file.
const path = require('path');

// mapping delle rotte.
router.post('/register', authController.register);
router.post('/login', authController.login);
/*  Non serve un controller, è necessario per
    rendere reset-password accessibile con token. */

router.get('/reset-password/:token', (req, res) => {
  const token = req.params.token;
  res.sendFile(path.join(__dirname, '../frontend/reset-password.html'));
});
router.post('/reset-password', authController.resetPassword);
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;
