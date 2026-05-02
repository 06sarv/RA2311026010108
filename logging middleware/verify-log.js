'use strict';

const { configureLogger, Log } = require('./index');

function readTokenFromArgs() {
  const directToken = process.argv[2];
  if (typeof directToken === 'string' && directToken.trim() !== '') {
    return directToken.trim();
  }

  return (
    process.env.EVALUATION_SERVICE_TOKEN ||
    process.env.LOGGING_AUTH_TOKEN ||
    ''
  ).trim();
}

async function main() {
  const token = readTokenFromArgs();

  if (!token) {
    throw new Error(
      'Missing bearer token. Pass it as the first argument or set EVALUATION_SERVICE_TOKEN.'
    );
  }

  configureLogger({ token });

  const response = await Log(
    'frontend',
    'info',
    'utils',
    'logging middleware verification request'
  );

  process.stdout.write(`${JSON.stringify(response, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
