# Logging Middleware

Reusable logger for the assessment.

## Usage

```js
const { Log, configureLogger } = require('./index');

configureLogger({ token: 'your-bearer-token' });
await Log('frontend', 'info', 'component', 'App loaded successfully');
```

## Verify the Log API

```bash
EVALUATION_SERVICE_TOKEN='<bearer-token>' node 'logging middleware/verify-log.js'
```

Expected result:
- HTTP success from the evaluation service
- A JSON response containing a `logID`
