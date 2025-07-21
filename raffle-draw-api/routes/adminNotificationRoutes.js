const router = require('express').Router();
const controller = require('../controller/notificationController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, controller.getAll);
router.post('/', authenticateToken, controller.create);
router.get('/user/:userId', authenticateToken, controller.getByUser);

module.exports = router;
