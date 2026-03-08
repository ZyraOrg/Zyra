const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, changePassword } = require('../controllers/settings.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getSettings);
router.put('/', protect, updateSettings);
router.post('/change-password', protect, changePassword);

module.exports = router;
