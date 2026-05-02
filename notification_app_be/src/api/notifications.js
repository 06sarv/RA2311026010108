'use strict';

const { Log } = require('../../../logging middleware/index');
const { getEvaluationConfig } = require('../config/evaluation');

function buildAuthHeader(token) {
  return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
}

function isNotificationShape(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof value.ID === 'string' &&
      typeof value.Type === 'string' &&
      typeof value.Message === 'string' &&
      typeof value.Timestamp === 'string'
  );
}

async function parseJson(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function fetchNotifications() {
  const { notificationsEndpoint, token } = getEvaluationConfig();

  await Log(
    'backend',
    'info',
    'handler',
    'notifications fetch started'
  );

  const response = await fetch(notificationsEndpoint, {
    method: 'GET',
    headers: {
      Authorization: buildAuthHeader(token),
    },
  });

  const payload = await parseJson(response);

  if (response.status === 401) {
    await Log(
      'backend',
      'error',
      'handler',
      'notifications auth expired'
    );

    throw new Error('Notifications request failed: invalid or expired token.');
  }

  if (!response.ok) {
    await Log(
      'backend',
      'error',
      'handler',
      `notifications fetch failed ${response.status}`
    );

    throw new Error(
      `Notifications request failed with status ${response.status}: ${JSON.stringify(payload)}`
    );
  }

  const notifications = payload?.notifications;

  if (!Array.isArray(notifications)) {
    await Log(
      'backend',
      'error',
      'handler',
      'notifications array missing'
    );
    throw new TypeError('Notifications response did not contain a notifications array.');
  }

  const invalidItem = notifications.find((notification) => !isNotificationShape(notification));

  if (invalidItem) {
    await Log(
      'backend',
      'error',
      'handler',
      `invalid notification item: ${invalidItem.ID || 'unknown'}`
    );
    throw new TypeError('Notifications response contained an invalid notification object.');
  }

  await Log(
    'backend',
    'info',
    'handler',
    `notifications fetched: ${notifications.length}`
  );

  return notifications;
}

module.exports = {
  fetchNotifications,
};
