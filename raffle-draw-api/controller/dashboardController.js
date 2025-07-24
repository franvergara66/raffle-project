const Admin = require('../models/adminModel');

exports.getStats = async (_req, res) => {
  // Ticket stats are not available without the legacy DB
  const totalSellTicket = 0;
  const totalSellAmount = 0;
  const uniqueUsers = new Set();
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
