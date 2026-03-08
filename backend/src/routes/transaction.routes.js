const express = require('express');
const router = express.Router();
const { getMyTransactions } = require('../controllers/transaction.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getMyTransactions);

module.exports = router;
