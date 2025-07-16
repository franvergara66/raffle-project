const db = require("../db/mysql");
const bcrypt = require("bcryptjs");


const Admin = {
  findAll: async () => {
    const [rows] = await db.query("SELECT id, name, email, username, image, created_at, updated_at FROM admins");
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query("SELECT id, name, email, username, image, created_at, updated_at FROM admins WHERE id = ?", [id]);
    return rows[0];
  },

  findByEmail: async (email) => {
    const [rows] = await db.query("SELECT * FROM admins WHERE email = ?", [email]);
    return rows;
  },

  create: async ({ name, email, username, password, image }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO admins (name, email, username, password, image) VALUES (?, ?, ?, ?, ?)",
      [name, email, username, hashedPassword, image || null]
    );
    return { id: result.insertId };
  },

  update: async (id, { name, email, username, image }) => {
    const [result] = await db.query(
      "UPDATE admins SET name = ?, email = ?, username = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [name, email, username, image, id]
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await db.query("DELETE FROM admins WHERE id = ?", [id]);
    return result;
  },
};

module.exports = Admin;

