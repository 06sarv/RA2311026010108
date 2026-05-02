'use strict';

function NotificationComposer({ title, body, onSubmit }) {
  return {
    type: 'NotificationComposer',
    title,
    body,
    onSubmit,
  };
}

module.exports = {
  NotificationComposer,
};

