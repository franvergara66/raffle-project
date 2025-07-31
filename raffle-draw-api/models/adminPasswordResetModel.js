const db = require('../db/mysql');

const AdminPasswordReset = {
  create: async ({ email, token }) => {
    const [result] = await db.query(
      'INSERT INTO admin_password_resets (email, token, status, created_at, updated_at) VALUES (?, ?, 0, NOW(), NOW())',
      [email, token]
    );
    return { id: result.insertId };
  },

  findValid: async (email, token) => {
    const [rows] = await db.query(
      'SELECT * FROM admin_password_resets WHERE email = ? AND token = ? AND status = 0 ORDER BY created_at DESC LIMIT 1',
      [email, token]
    );
    return rows[0];
  },

  markUsed: async (id) => {
    await db.query(
      'UPDATE admin_password_resets SET status = 1, updated_at = NOW() WHERE id = ?',
      [id]
    );
  }
};

module.exports = AdminPasswordReset;
