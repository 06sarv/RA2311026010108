'use strict';

const { Log } = require('../../../logging middleware/index');

const TYPE_WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function parseTimestamp(timestamp) {
  const value = Date.parse(timestamp.replace(' ', 'T'));

  if (Number.isNaN(value)) {
    throw new TypeError(`Invalid notification timestamp: ${timestamp}`);
  }

  return value;
}

function rankNotifications(notifications, limit = 10) {
  return [...notifications]
    .sort((left, right) => {
      const weightDelta = TYPE_WEIGHTS[right.Type] - TYPE_WEIGHTS[left.Type];
      if (weightDelta !== 0) {
        return weightDelta;
      }

      return parseTimestamp(right.Timestamp) - parseTimestamp(left.Timestamp);
    })
    .slice(0, limit);
}

async function getPriorityNotifications(notifications, limit = 10) {
  await Log(
    'backend',
    'info',
    'service',
    `ranking started: ${notifications.length}`
  );

  const unsupportedType = notifications.find(
    (notification) => !Object.prototype.hasOwnProperty.call(TYPE_WEIGHTS, notification.Type)
  );

  if (unsupportedType) {
    await Log(
      'backend',
      'warn',
      'service',
      `unsupported type: ${unsupportedType.Type}`
    );
  }

  const eligibleNotifications = notifications.filter((notification) =>
    Object.prototype.hasOwnProperty.call(TYPE_WEIGHTS, notification.Type)
  );

  const rankedNotifications = rankNotifications(eligibleNotifications, limit);

  await Log(
    'backend',
    'info',
    'service',
    `ranking complete: ${rankedNotifications.length}`
  );

  return rankedNotifications;
}

module.exports = {
  TYPE_WEIGHTS,
  getPriorityNotifications,
  parseTimestamp,
  rankNotifications,
};
