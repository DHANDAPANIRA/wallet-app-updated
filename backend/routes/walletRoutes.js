const express = require('express');
const router = express.Router();

const walletController = require('../controllers/walletController');

router.post('/deposit', walletController.deposit);   // ✅ don't use ()
router.post('/withdraw', walletController.withdraw);
router.get('/:userId', walletController.getBalance);
router.get('/transactions/:userId', walletController.getTransactions);
router.get('/daily-summary/:userId', walletController.getDailySummary);

module.exports = router;
