const router = require('express').Router();
const ctrl = require('../controller/lotteryController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, ctrl.getAll);
router.post('/', authenticateToken, ctrl.create);
router.get('/:id', authenticateToken, ctrl.getById);
router.put('/:id', authenticateToken, ctrl.update);
router.patch('/:id/status', authenticateToken, ctrl.toggleStatus);

router.get('/:lotteryId/phases', authenticateToken, ctrl.getPhases);
router.post('/:lotteryId/phases', authenticateToken, ctrl.createPhase);
router.put('/phases/:id', authenticateToken, ctrl.updatePhase);
router.patch('/phases/:id/status', authenticateToken, ctrl.togglePhaseStatus);

router.get('/:lotteryId/bonuses', authenticateToken, ctrl.getBonuses);
router.post('/:lotteryId/bonuses', authenticateToken, ctrl.setBonuses);

module.exports = router;
