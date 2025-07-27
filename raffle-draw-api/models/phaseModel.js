const db = require('../db/mysql');

const Phase = {
  findByLottery: async (lotteryId) => {
    const [rows] = await db.query('SELECT * FROM phases WHERE lottery_id=? ORDER BY id DESC', [lotteryId]);
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM phases WHERE id=?', [id]);
    return rows[0];
  },
  create: async ({ lottery_id, phase_number, start, end, quantity, available, at_dr }) => {
    const [result] = await db.query(
      `INSERT INTO phases (lottery_id, phase_number, start, end, quantity, available, at_dr, status, draw_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, 0)`,
      [lottery_id, phase_number, start, end, quantity, available, at_dr]
    );
    return { id: result.insertId };
  },
  update: async (id, { start, end, quantity, available, at_dr }) => {
    await db.query(
      'UPDATE phases SET start=?, end=?, quantity=?, available=?, at_dr=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',
      [start, end, quantity, available, at_dr, id]
    );
  },
  toggleStatus: async (id) => {
    await db.query('UPDATE phases SET status = IF(status=1,0,1) WHERE id=?', [id]);
  },
};

module.exports = Phase;
