const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profile.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { updateProfileSchema } = require('../validators/profile.validators');

router.get('/', protect, getProfile);
router.put('/', protect, validate(updateProfileSchema), updateProfile);

module.exports = router;
