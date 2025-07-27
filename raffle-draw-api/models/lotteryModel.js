const db = require('../db/mysql');

const Lottery = {
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM lotteries ORDER BY id DESC');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM lotteries WHERE id = ?', [id]);
    return rows[0];
  },
  create: async ({ name, price, detail, image }) => {
    const [result] = await db.query(
      'INSERT INTO lotteries (name, price, detail, image, status) VALUES (?, ?, ?, ?, 1)',
      [name, price, detail, image]
    );
    return { id: result.insertId };
  },
  update: async (id, { name, price, detail, image }) => {
    await db.query(
      'UPDATE lotteries SET name=?, price=?, detail=?, image=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',
      [name, price, detail, image, id]
    );
  },
  toggleStatus: async (id) => {
    await db.query('UPDATE lotteries SET status = IF(status=1,0,1) WHERE id=?', [id]);
  },
};

module.exports = Lottery;
