# Notification System Design

## Goal
Provide a reusable logging flow for the assessment that can be consumed by frontend and backend code.

## High-level flow
1. Application code calls `Log(stack, level, package, message)`.
2. The logger validates values against the allowed sets.
3. The logger sends a `POST` request to the evaluation log API.
4. The response is surfaced to the caller so failures are visible immediately.

## API contract
- Endpoint: `POST http://20.207.122.201/evaluation-service/logs`
- Body:
  - `stack`: `frontend` or `backend`
  - `level`: `debug`, `info`, `warn`, `error`, `fatal`
  - `package`: logical package name such as `api`, `component`, `hook`, `page`, `state`, `style`, `middleware`, `utils`
  - `message`: descriptive log message

## Architecture
- `logging middleware/` contains the reusable logger.
- `notification_app_fe/` contains frontend feature folders:
  - `api`
  - `component`
  - `hook`
  - `page`
  - `state`
  - `style`
- `notification_app_be/` holds backend-side code or placeholders when the backend track is required.

## Design choices
- Validate inputs before sending the request.
- Keep the logger transport-agnostic so it can run in browser or Node environments.
- Resolve auth tokens from runtime configuration first, then from environment or browser storage when present.

