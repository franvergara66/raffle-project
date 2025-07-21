const db = require('../db/notificationDb');

exports.getAll = (_req, res) => {
  const notes = db.find();
  res.json(notes);
};

exports.getByUser = (req, res) => {
  const notes = db.findByUserId(req.params.userId);
  res.json(notes);
};

exports.create = (req, res) => {
  const { userId, message } = req.body;
  if (!userId || !message) {
    return res.status(400).json({ message: 'userId and message required' });
  }
  const note = db.create(userId, message);
  res.status(201).json(note);
};
