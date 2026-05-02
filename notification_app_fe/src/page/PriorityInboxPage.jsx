import React from 'react';
import {
  Alert,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  buildCommonPageModel,
  buildPrimaryList,
  NotificationPageFrame,
  useNotificationConsole,
} from './shared.jsx';

export function PriorityInboxPage() {
  const consoleState = useNotificationConsole();
  const common = buildCommonPageModel(consoleState);

  return (
    <NotificationPageFrame
      eyebrow="Stage 2 / Priority View"
      title="Priority Inbox"
      subtitle="Keep the most important unread candidates in a separate lane using the same backend weighting rule from Stage 1 while still supporting page-level filtering."
      controls={common.controls}
      primaryList={
        <Stack spacing={3}>
          <Paper sx={{ p: 3, border: '1px solid rgba(15, 76, 92, 0.08)' }}>
            <Stack spacing={1}>
              <Typography variant="h6">Priority ranking rule</Typography>
              <Typography variant="body2" color="text.secondary">
                Placement notifications outrank Results, which outrank Events. Recency
                breaks ties inside the same type.
              </Typography>
            </Stack>
          </Paper>
          {consoleState.state.notificationType !== 'All' ? (
            <Alert severity="info">
              The current type filter is applied before ranking the priority inbox.
            </Alert>
          ) : null}
          {buildPrimaryList(consoleState, common.priorityNotifications)}
        </Stack>
      }
      logs={consoleState.logs}
      selectedNotification={consoleState.state.selectedNotification}
      closeNotification={() => consoleState.dispatch({ type: 'notificationClosed' })}
      token={consoleState.storedToken}
      saveToken={consoleState.updateAccessToken}
      summary={common.summary}
      status={consoleState.state.status}
      error={consoleState.state.error}
      pagination={common.pagination}
    />
  );
}
