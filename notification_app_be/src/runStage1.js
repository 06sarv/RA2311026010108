'use strict';

const { configureLogger } = require('../../logging middleware/index');
const { fetchNotifications } = require('./api/notifications');
const { getPriorityNotifications } = require('./service/prioritizeNotifications');
const { formatNotificationsTable } = require('./utils/formatNotifications');

async function main() {
  configureLogger({});

  const notifications = await fetchNotifications();
  const rankedNotifications = await getPriorityNotifications(notifications, 10);

  process.stdout.write(formatNotificationsTable(rankedNotifications));
}

main().catch(async (error) => {
  try {
    const { Log } = require('../../logging middleware/index');
    await Log('backend', 'fatal', 'utils', 'stage1 runner failed');
  } catch (_) {
    // Avoid recursive fallback logging when the remote logger is unavailable.
  }

  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
