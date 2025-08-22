const GeneralSetting = require('../models/generalSettingModel');

/**
 * Middleware to block requests when user registration is disabled
 * in the system settings.
 */
async function allowRegistration(req, res, next) {
  try {
    const settings = await GeneralSetting.getSettings();
    if (settings && settings.registration === 0) {
      return res.status(403).json({ message: 'Registration is currently disabled.' });
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = allowRegistration;
