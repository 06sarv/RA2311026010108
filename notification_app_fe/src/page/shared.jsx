import React, { useEffect } from 'react';
import { Alert, Grid, LinearProgress, Stack } from '@mui/material';
import { NotificationComposer } from '@/component/NotificationComposer.jsx';
import { NotificationDetail } from '@/component/NotificationDetail.jsx';
import { NotificationShell } from '@/component/NotificationShell.jsx';
import { NotificationSummary } from '@/component/NotificationSummary.jsx';
import { NotificationTable } from '@/component/NotificationTable.jsx';
import { PaginationStrip } from '@/component/PaginationStrip.jsx';
import { TokenPanel } from '@/component/TokenPanel.jsx';
import { LogFeed } from '@/component/LogFeed.jsx';
import { useNotifications } from '@/hook/useNotifications.js';
import { useLogs } from '@/hook/useLogs.js';
import { getPriorityNotifications, getStatusBreakdown } from '@/state/notificationState.js';
import { logFrontendEvent, setLogListener } from '@/utils/logger.js';

export function useNotificationConsole() {
  const notificationState = useNotifications();
  const logState = useLogs();

  useEffect(() => {
    setLogListener(logState.appendLog);

    return () => {
      setLogListener(null);
    };
  }, [logState.appendLog]);

  async function openNotification(notification) {
    notificationState.dispatch({ type: 'notificationOpened', payload: notification });
    await logFrontendEvent('info', 'component', 'notification opened');
  }

  return {
    ...notificationState,
    logs: logState.logs,
    openNotification,
  };
}

export function NotificationPageFrame({
  eyebrow,
  title,
  subtitle,
  controls,
  primaryList,
  logs,
  selectedNotification,
  closeNotification,
  token,
  saveToken,
  summary,
  status,
  error,
  pagination,
}) {
  return (
    <NotificationShell eyebrow={eyebrow} title={title} subtitle={subtitle}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {status === 'loading' ? <LinearProgress color="secondary" /> : null}
            {error ? <Alert severity="error">{error}</Alert> : null}
            <NotificationSummary summary={summary} />
            {controls}
            {primaryList}
            {pagination}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            <TokenPanel defaultValue={token} onSave={saveToken} />
            <LogFeed items={logs} />
          </Stack>
        </Grid>
      </Grid>
      <NotificationDetail
        notification={selectedNotification}
        open={Boolean(selectedNotification)}
        onClose={closeNotification}
      />
    </NotificationShell>
  );
}

export function buildCommonPageModel(consoleState) {
  const summary = getStatusBreakdown(consoleState.state.notifications);
  const priorityNotifications = getPriorityNotifications(
    consoleState.state.notifications,
    consoleState.state.priorityLimit
  );

  const controls = (
    <NotificationComposer
      limit={consoleState.state.limit}
      notificationType={consoleState.state.notificationType}
      priorityLimit={consoleState.state.priorityLimit}
      onLimitChange={(value) => consoleState.dispatch({ type: 'limitChanged', payload: value })}
      onTypeChange={(value) => consoleState.dispatch({ type: 'typeChanged', payload: value })}
      onPriorityLimitChange={(value) =>
        consoleState.dispatch({ type: 'priorityLimitChanged', payload: value })
      }
      showPriorityLimit
    />
  );

  const pagination = (
    <PaginationStrip
      page={consoleState.state.page}
      onChange={(value) => consoleState.dispatch({ type: 'pageChanged', payload: value })}
      hasFullPage={consoleState.state.notifications.length === consoleState.state.limit}
      countHint={consoleState.state.page * consoleState.state.limit}
    />
  );

  return {
    controls,
    pagination,
    priorityNotifications,
    summary,
  };
}

export function buildPrimaryList(consoleState, notifications) {
  return (
    <NotificationTable
      notifications={notifications}
      viewedIds={consoleState.state.viewedIds}
      onOpen={consoleState.openNotification}
    />
  );
}
