const express = require('express');
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, accountController.getAccount);
router.post('/deposit', authMiddleware, accountController.deposit);
router.post('/withdraw', authMiddleware, accountController.withdraw);

module.exports = router;