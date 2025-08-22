const db = require('../db/mysql');

const GeneralSetting = {
  /**
   * Fetch the single row from general_settings table.
   * Assumes only one row exists.
   */
  async getSettings() {
    const [rows] = await db.query('SELECT * FROM general_settings LIMIT 1');
    return rows[0];
  },
};

module.exports = GeneralSetting;
