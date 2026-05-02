'use strict';

const { Log, configureLogger } = require('../../../logging middleware/index');

function configureFrontendLogger(token, endpoint) {
  const nextConfig = {};

  if (typeof token === 'string' && token.trim() !== '') {
    nextConfig.token = token.trim();
  }

  if (typeof endpoint === 'string' && endpoint.trim() !== '') {
    nextConfig.endpoint = endpoint.trim();
  }

  return configureLogger(nextConfig);
}

async function logFrontendEvent(level, pkg, message) {
  return Log('frontend', level, pkg, message);
}

module.exports = {
  Log,
  configureLogger,
  configureFrontendLogger,
  logFrontendEvent,
};
