import { logFrontendEvent } from '@/utils/logger.js';

const BASE_ENDPOINT = '/evaluation-service/notifications';
const priorityOrder = ['Placement', 'Result', 'Event'];
const priorityWeights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function readAuthToken() {
  const runtimeToken = window.localStorage.getItem('evaluation_access_token');
  if (runtimeToken) {
    return runtimeToken;
  }

  const windowToken = window.__EVALUATION_SERVICE_TOKEN__ || '';
  return String(windowToken).trim();
}

function buildQuery(params) {
  const query = new URLSearchParams();

  if (params.limit) {
    query.set('limit', String(params.limit));
  }

  if (params.page) {
    query.set('page', String(params.page));
  }

  if (params.notificationType && params.notificationType !== 'All') {
    query.set('notification_type', params.notificationType);
  }

  return query.toString();
}

function buildUrl(params) {
  const query = buildQuery(params);
  return query ? `${BASE_ENDPOINT}?${query}` : BASE_ENDPOINT;
}

async function parseJson(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

function extractErrorMessage(payload) {
  if (typeof payload?.message === 'string' && payload.message.trim() !== '') {
    return payload.message.trim();
  }

  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    const firstError = payload.errors[0];

    if (typeof firstError === 'string' && firstError.trim() !== '') {
      return firstError.trim();
    }

    if (firstError && typeof firstError === 'object') {
      const [field, reason] = Object.entries(firstError)[0] || [];
      if (field && reason) {
        return `${field} ${reason}`;
      }
    }
  }

  return 'Failed to load notifications.';
}

function ensureNotificationsShape(payload) {
  if (!payload || !Array.isArray(payload.notifications)) {
    throw new Error('Invalid notifications payload.');
  }

  return payload.notifications;
}

function sortPriorityNotifications(notifications) {
  return [...notifications].sort((left, right) => {
    const weightDelta = priorityWeights[right.Type] - priorityWeights[left.Type];

    if (weightDelta !== 0) {
      return weightDelta;
    }

    return (
      Date.parse(right.Timestamp.replace(' ', 'T')) -
      Date.parse(left.Timestamp.replace(' ', 'T'))
    );
  });
}

async function fetchNotificationRequest(params, startedMessage, successPrefix) {
  const token = readAuthToken();

  if (!token) {
    await logFrontendEvent('error', 'api', 'frontend token missing');
    throw new Error('Missing evaluation access token.');
  }

  const requestUrl = buildUrl(params);
  await logFrontendEvent('info', 'api', startedMessage);

  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: {
      Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
    },
  });

  const payload = await parseJson(response);

  if (response.status === 401) {
    await logFrontendEvent('error', 'api', 'frontend token expired');
    throw new Error('Access token expired. Refresh it and retry.');
  }

  if (!response.ok) {
    const errorMessage = extractErrorMessage(payload);
    await logFrontendEvent('error', 'api', `feed failed ${response.status}`);
    await logFrontendEvent('error', 'api', errorMessage);
    throw new Error(errorMessage);
  }

  const notifications = ensureNotificationsShape(payload);
  await logFrontendEvent('info', 'api', `${successPrefix} ${notifications.length}`);

  return notifications;
}

export async function fetchNotifications(params) {
  return fetchNotificationRequest(params, 'feed fetch started', 'feed loaded');
}

async function fetchPriorityTypeSlice(notificationType, remainingCount) {
  const collected = [];
  let page = 1;

  while (collected.length < remainingCount) {
    const pageLimit = Math.min(remainingCount - collected.length, 10);

    const pageItems = await fetchNotificationRequest(
      {
        page,
        limit: pageLimit,
        notificationType,
      },
      'priority fetch started',
      'priority loaded'
    );

    if (pageItems.length === 0) {
      break;
    }

    collected.push(...pageItems);

    if (pageItems.length < pageLimit) {
      break;
    }

    page += 1;
  }

  return collected;
}

export async function fetchPriorityNotifications({ limit, notificationType }) {
  const safeLimit = Math.max(1, Number(limit) || 1);

  if (notificationType && notificationType !== 'All') {
    const items = await fetchPriorityTypeSlice(notificationType, safeLimit);
    return sortPriorityNotifications(items).slice(0, safeLimit);
  }

  const collected = [];

  for (const type of priorityOrder) {
    const remainingCount = safeLimit - collected.length;

    if (remainingCount <= 0) {
      break;
    }

    const typeItems = await fetchPriorityTypeSlice(type, remainingCount);
    collected.push(...typeItems);
  }

  return sortPriorityNotifications(collected).slice(0, safeLimit);
}

export function saveAccessToken(token) {
  const value = String(token || '').trim();

  if (!value) {
    window.localStorage.removeItem('evaluation_access_token');
    return;
  }

  window.localStorage.setItem('evaluation_access_token', value);
}

export function getStoredAccessToken() {
  return window.localStorage.getItem('evaluation_access_token') || '';
}
