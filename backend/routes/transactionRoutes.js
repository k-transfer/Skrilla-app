const express = require('express');
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/transfer', authMiddleware, transactionController.transfer);
router.get('/', authMiddleware, transactionController.getTransactions);

module.exports = router;