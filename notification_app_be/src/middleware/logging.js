'use strict';

const { Log } = require('../../../logging middleware/index');

async function loggingMiddleware(req, res, next) {
  try {
    await Log('backend', 'info', 'middleware', `${req.method} ${req.originalUrl || req.url}`);
  } catch (error) {
    if (typeof console !== 'undefined' && console.error) {
      console.error('Logging middleware failed:', error);
    }
  }

  if (typeof next === 'function') {
    return next();
  }

  return undefined;
}

module.exports = {
  loggingMiddleware,
};

