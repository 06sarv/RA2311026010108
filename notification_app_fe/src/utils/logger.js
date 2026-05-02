import { Log, configureLogger } from '../../../logging middleware/browser.js';

let logListener = null;

function clampMessage(message) {
  return String(message).trim().slice(0, 48);
}

export function setLogListener(listener) {
  logListener = typeof listener === 'function' ? listener : null;
}

export function configureFrontendLogger(token, endpoint) {
  const nextConfig = {};

  if (typeof token === 'string' && token.trim() !== '') {
    nextConfig.token = token.trim();
  }

  if (typeof endpoint === 'string' && endpoint.trim() !== '') {
    nextConfig.endpoint = endpoint.trim();
  }

  return configureLogger(nextConfig);
}

export async function logFrontendEvent(level, pkg, message) {
  const safeMessage = clampMessage(message);

  if (logListener) {
    logListener({
      level,
      packageName: pkg,
      message: safeMessage,
    });
  }

  try {
    return await Log('frontend', level, pkg, safeMessage);
  } catch (error) {
    if (logListener) {
      logListener({
        level: 'warn',
        packageName: 'utils',
        message: 'remote log skipped',
      });
    }

    return null;
  }
}
