# Stage 2 Frontend

## Run locally

```bash
cd notification_app_fe
npm install
npm run dev
```

The app is expected to run on:

```text
http://localhost:3000
```

## Refresh the access token

Generate a fresh token before testing the UI:

```bash
curl -sS -X POST 'http://20.207.122.201/evaluation-service/auth' \
  -H 'Content-Type: application/json' \
  -d '{"email":"sn9702@srmist.edu.in","name":"Sarvagna Nandyala","rollNo":"RA2311026010108","accessCode":"QkbpxH","clientID":"fc42794c-c198-4e6d-9b75-98bde16dc441","clientSecret":"EAztTbvHjdstyvUJ"}'
```

Copy only the `access_token` value and paste it into the token panel inside the app.

## Pages

- `/`
  Full notifications feed with paging, type filtering, and viewed-state tracking.
- `/priority`
  Priority inbox that fetches and ranks the top `n` notifications independently using:
  - `Placement > Result > Event`
  - recency within the same type

## Frontend behavior

- Uses Material UI for the interface.
- Uses the shared logging middleware for frontend log submission.
- Saves the access token in local storage for repeated testing.
- Saves viewed notification IDs in local storage so opened items switch from `New` to `Viewed`.
- Uses a Vite proxy for `/evaluation-service/*` so browser requests can be tested locally.

## Manual verification checklist

- Save a fresh token in the token panel.
- Confirm the feed loads successfully on `/`.
- Change `Rows per page` and verify the list updates.
- Change `Notification Type` and verify the filter is applied.
- Open a notification and confirm it becomes `Viewed`.
- Open `/priority` and move the `Priority inbox size` slider.
- Confirm the number of priority results changes independently of the feed page.
- Confirm the frontend log panel updates after each action.

## Recording checklist

- Desktop view of `/`
- Desktop view of `/priority`
- Token save flow
- Filter change
- Page size change
- Viewed-state change
- Priority inbox size change
- Mobile responsive view of both pages
