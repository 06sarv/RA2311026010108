'use strict';

const { Log } = require('../../../logging middleware/index');

async function loggingMiddleware(req, res, next) {
  try {
    await Log('backend', 'info', 'middleware', `${req.method} ${req.originalUrl || req.url}`);
  } catch (_) {
    // Logging is best-effort here to avoid breaking the request pipeline.
  }

  if (typeof next === 'function') {
    return next();
  }

  return undefined;
}

module.exports = {
  loggingMiddleware,
};
