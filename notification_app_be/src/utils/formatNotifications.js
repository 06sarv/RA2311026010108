'use strict';

function formatNotificationsTable(notifications) {
  const lines = [
    'Priority Notifications',
    '======================',
  ];

  notifications.forEach((notification, index) => {
    lines.push(
      [
        `${String(index + 1).padStart(2, '0')}.`,
        `ID=${notification.ID}`,
        `Type=${notification.Type}`,
        `Timestamp=${notification.Timestamp}`,
        `Message=${notification.Message}`,
      ].join(' | ')
    );
  });

  return `${lines.join('\n')}\n`;
}

module.exports = {
  formatNotificationsTable,
};
