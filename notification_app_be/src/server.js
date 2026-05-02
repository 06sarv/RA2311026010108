'use strict';

const { loggingMiddleware } = require('./middleware/logging');
const { fetchNotifications } = require('./api/notifications');
const { getPriorityNotifications } = require('./service/prioritizeNotifications');

function createServer() {
  return {
    use: loggingMiddleware,
    async getPriorityNotifications(limit = 10) {
      const notifications = await fetchNotifications();
      return getPriorityNotifications(notifications, limit);
    },
    listen(port, callback) {
      if (typeof callback === 'function') {
        callback();
      }

      return { port };
    },
  };
}

module.exports = {
  createServer,
};
