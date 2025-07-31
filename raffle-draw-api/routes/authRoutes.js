const router = require('express').Router();
const controller = require('../controller/authController');

router.post('/send-reset-code', controller.sendResetCode);
router.post('/verify-code', controller.verifyCode);

module.exports = router;
