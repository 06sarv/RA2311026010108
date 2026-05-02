import React from 'react';
import {
  buildCommonPageModel,
  buildPrimaryList,
  NotificationPageFrame,
  useNotificationConsole,
} from './shared.jsx';

export function NotificationDashboard() {
  const consoleState = useNotificationConsole();
  const common = buildCommonPageModel(consoleState);

  return (
    <NotificationPageFrame
      eyebrow="Stage 2 / Feed View"
      title="Live Notifications Feed"
      subtitle="Inspect the current notification page, separate fresh items from viewed ones, and control the feed size without leaving the dashboard."
      controls={common.controls}
      primaryList={buildPrimaryList(consoleState, consoleState.state.notifications)}
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
