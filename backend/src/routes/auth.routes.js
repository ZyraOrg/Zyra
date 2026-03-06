const express = require('express');
const router = express.Router();
const { signup, googleLogin, googleCallback, login, setSession, getMe, logout } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { signupSchema, loginSchema } = require('../validators/auth.validators');

router.post('/signup', validate(signupSchema), signup);
router.get('/google', googleLogin);
router.get('/callback', googleCallback);
router.post('/login', validate(loginSchema), login);
router.post('/session', setSession);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

module.exports = router;
