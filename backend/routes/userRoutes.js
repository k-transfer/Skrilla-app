const express = require('express');
const { register, login, transfer } = require('../controllers/userController');
const router = express.Router(); 


router.post('/register', register);
router.post('/login', login);
router.post('/transfer', transfer);

module.exports = router;