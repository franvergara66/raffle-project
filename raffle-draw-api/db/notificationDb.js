const AdminNotification = require('../models/AdminNotification');

class NotificationDB {
  constructor() {
    this.notifications = [];
  }

  create(userId, message) {
    const note = new AdminNotification(userId, message);
    this.notifications.push(note);
    return note;
  }

  find() {
    return this.notifications;
  }

  findByUserId(userId) {
    return this.notifications.filter((n) => n.userId === userId);
  }
}

module.exports = new NotificationDB();
