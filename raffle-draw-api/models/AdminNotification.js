const shortId = require('shortid');

class AdminNotification {
  constructor(userId, message) {
    if (!userId || !message) {
      throw new Error('userId and message are required');
    }
    this.id = shortId.generate();
    this.userId = userId;
    this.message = message;
    this.createdAt = new Date();
  }
}

module.exports = AdminNotification;
