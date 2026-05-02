'use strict';

const { loggingMiddleware } = require('./middleware/logging');

function createServer() {
  return {
    use: loggingMiddleware,
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

