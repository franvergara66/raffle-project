const Admin = require('../models/adminModel');

/**
 * Ensures the authenticated user has an admin role.
 * Expects previous middleware to populate `req.admin` with the user info.
 */
async function redirectIfNotAdmin(req, res, next) {
  if (!req.admin) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin || admin.role !== 'superadmin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = redirectIfNotAdmin;
