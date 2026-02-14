const express = require('express');
const router = express.Router();
const { signup, verify } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/verify', verify);

module.exports = router;
