const db = require('../db/db');
const Admin = require('../models/adminModel');

exports.getStats = async (_req, res) => {
  // Gather stats from db and admin model
  const tickets = db.find();
  const totalSellTicket = tickets.length;
  const totalSellAmount = tickets.reduce((sum, t) => sum + (t.price || 0), 0);
  const uniqueUsers = new Set(tickets.map(t => t.username));
  let adminsCount = 0;
  try {
    const admins = await Admin.findAll();
    adminsCount = admins.length;
  } catch (err) {
    // ignore db errors for now
  }
  res.json({
    totalUsers: uniqueUsers.size + adminsCount,
    verifiedUsers: uniqueUsers.size + adminsCount,
    emailUnverifiedUsers: 0,
    smsUnverifiedUsers: 0,
    totalSellTicket,
    totalSellAmount,
    totalWinner: 0,
    totalWinAmount: 0
  });
};
