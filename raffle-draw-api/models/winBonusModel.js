const db = require('../db/mysql');

const WinBonus = {
  findByLottery: async (lotteryId) => {
    const [rows] = await db.query('SELECT * FROM win_bonuses WHERE lottery_id=? ORDER BY level', [lotteryId]);
    return rows;
  },
  deleteByLottery: async (lotteryId) => {
    await db.query('DELETE FROM win_bonuses WHERE lottery_id=?', [lotteryId]);
  },
  create: async ({ lottery_id, level, amount }) => {
    await db.query(
      'INSERT INTO win_bonuses (lottery_id, level, amount, status) VALUES (?, ?, ?, 1)',
      [lottery_id, level, amount]
    );
  },
};

module.exports = WinBonus;
