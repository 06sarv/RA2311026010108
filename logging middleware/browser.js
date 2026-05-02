const DEFAULT_ENDPOINT = 'http://20.207.122.201/evaluation-service/logs';
const ALLOWED_STACKS = new Set(['backend', 'frontend']);
const ALLOWED_LEVELS = new Set(['debug', 'info', 'warn', 'error', 'fatal']);

let runtimeConfig = {
  endpoint: DEFAULT_ENDPOINT,
  token: null,
};

export function configureLogger(nextConfig = {}) {
  if (nextConfig === null || typeof nextConfig !== 'object') {
    throw new TypeError('configureLogger expects a configuration object.');
  }

  const updated = { ...runtimeConfig, ...nextConfig };

  if (typeof updated.endpoint !== 'string' || updated.endpoint.trim() === '') {
    throw new TypeError('Logger endpoint must be a non-empty string.');
  }

  runtimeConfig = {
    endpoint: updated.endpoint.trim(),
    token: typeof updated.token === 'string' ? updated.token.trim() : null,
  };

  return getLoggerConfig();
}

export function getLoggerConfig() {
  return { ...runtimeConfig };
}

function readToken() {
  if (runtimeConfig.token) {
    return runtimeConfig.token;
  }

  const stored =
    window.localStorage?.getItem('evaluation_access_token') ||
    window.localStorage?.getItem('access_token') ||
    window.sessionStorage?.getItem('access_token') ||
    window.__AUTH_TOKEN__ ||
    '';

  return String(stored).trim();
}

function normaliseAuthorization(token) {
  return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
}

function validateInput(stack, level, pkg, message) {
  if (!ALLOWED_STACKS.has(stack)) {
    throw new RangeError('stack must be frontend or backend.');
  }

  if (!ALLOWED_LEVELS.has(level)) {
    throw new RangeError('level must be debug, info, warn, error, or fatal.');
  }

  if (typeof pkg !== 'string' || pkg.trim() === '') {
    throw new TypeError('package must be a non-empty string.');
  }

  if (typeof message !== 'string' || message.trim() === '') {
    throw new TypeError('message must be a non-empty string.');
  }
}

async function parseResponseBody(response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function postLog(payload) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = readToken();
  if (token) {
    headers.Authorization = normaliseAuthorization(token);
  }

  const response = await fetch(runtimeConfig.endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  const body = await parseResponseBody(response);

  if (!response.ok) {
    const suffix = body ? `: ${JSON.stringify(body)}` : '';
    throw new Error(`Log request failed with status ${response.status}${suffix}`);
  }

  return body;
}

export async function Log(stack, level, pkg, message) {
  validateInput(stack, level, pkg, message);

  return postLog({
    stack,
    level,
    package: pkg,
    message,
  });
}
