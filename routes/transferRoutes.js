const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');

// Transfer money from one account to another
router.post('/transfer', transferController.transfer);

// Check Account Balance
router.get('/account/:accountNumber', transferController.getBalance);

// Get All Transactions
router.get('/transactions', transferController.getTransactions);

module.exports = router;
