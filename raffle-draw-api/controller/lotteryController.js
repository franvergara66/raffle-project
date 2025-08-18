const Lottery = require('../models/lotteryModel');
const Phase = require('../models/phaseModel');
const WinBonus = require('../models/winBonusModel');

exports.getAll = async (_req, res) => {
  const lotteries = await Lottery.findAll();
  res.json(lotteries);
};

exports.getById = async (req, res) => {
  const lottery = await Lottery.findById(req.params.id);
  if (!lottery) return res.status(404).json({ message: 'Not found' });
  res.json(lottery);
};

exports.create = async (req, res) => {
  const { name, price, detail, image } = req.body;
  if (!name || !price) return res.status(400).json({ message: 'Invalid data' });
  try {
    const { id } = await Lottery.create({ name, price, detail, image });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  const { name, price, detail, image } = req.body;
  try {
    await Lottery.update(req.params.id, { name, price, detail, image });
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleStatus = async (req, res) => {
  await Lottery.toggleStatus(req.params.id);
  res.json({ message: 'Status updated' });
};

exports.getAllPhases = async (req, res) => {
  const { search, start, end } = req.query;
  const phases = await Phase.findAllWithLottery({ search, start, end });
  res.json(phases);
};

exports.getPhases = async (req, res) => {
  const phases = await Phase.findByLottery(req.params.lotteryId);
  res.json(phases);
};

exports.createPhase = async (req, res) => {
  const { start, end, quantity, at_dr } = req.body;
  const phases = await Phase.findByLottery(req.params.lotteryId);
  const phase_number = phases.length + 1;
  const available = quantity;
  const { id } = await Phase.create({
    lottery_id: req.params.lotteryId,
    phase_number,
    start,
    end,
    quantity,
    available,
    at_dr,
  });
  res.status(201).json({ id });
};

exports.updatePhase = async (req, res) => {
  const { start, end, quantity, available, at_dr } = req.body;
  await Phase.update(req.params.id, { start, end, quantity, available, at_dr });
  res.json({ message: 'Phase updated' });
};

exports.togglePhaseStatus = async (req, res) => {
  await Phase.toggleStatus(req.params.id);
  res.json({ message: 'Phase status updated' });
};

exports.getBonuses = async (req, res) => {
  const bonuses = await WinBonus.findByLottery(req.params.lotteryId);
  res.json(bonuses);
};

exports.setBonuses = async (req, res) => {
  const { levels } = req.body; // [{level, amount}]
  await WinBonus.deleteByLottery(req.params.lotteryId);
  for (const b of levels) {
    await WinBonus.create({ lottery_id: req.params.lotteryId, level: b.level, amount: b.amount });
  }
  res.json({ message: 'Bonuses saved' });
};
