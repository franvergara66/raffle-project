const router = require('express').Router();
const controller = require('../controller/dashboardController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, controller.getStats);

module.exports = router;
