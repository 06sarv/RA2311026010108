'use strict';

const DEFAULT_NOTIFICATIONS_ENDPOINT =
  'http://20.207.122.201/evaluation-service/notifications';

function readEvaluationToken() {
  return (
    process.env.EVALUATION_SERVICE_TOKEN ||
    process.env.LOGGING_AUTH_TOKEN ||
    ''
  ).trim();
}

function getEvaluationConfig() {
  const token = readEvaluationToken();

  if (!token) {
    throw new Error(
      'Missing evaluation token. Set EVALUATION_SERVICE_TOKEN before running stage 1.'
    );
  }

  return {
    notificationsEndpoint:
      process.env.NOTIFICATIONS_API_ENDPOINT || DEFAULT_NOTIFICATIONS_ENDPOINT,
    token,
  };
}

module.exports = {
  DEFAULT_NOTIFICATIONS_ENDPOINT,
  getEvaluationConfig,
};
