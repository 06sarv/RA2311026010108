import { useEffect, useReducer, useRef, useState } from 'react';
import { fetchNotifications, getStoredAccessToken, saveAccessToken } from '@/api/notifications.js';
import {
  initialState,
  notificationsReducer,
} from '@/state/notificationState.js';
import { configureFrontendLogger, logFrontendEvent } from '@/utils/logger.js';

const viewedKey = 'campus_notification_viewed_ids';

export function useNotifications() {
  const [state, dispatch] = useReducer(notificationsReducer, initialState);
  const [tokenRevision, setTokenRevision] = useState(0);
  const hasHydratedViewedIds = useRef(false);

  useEffect(() => {
    if (hasHydratedViewedIds.current) {
      return;
    }

    hasHydratedViewedIds.current = true;
    const storedViewedIds = JSON.parse(window.localStorage.getItem(viewedKey) || '[]');
    const storedToken = getStoredAccessToken();
    if (storedToken) {
      configureFrontendLogger(storedToken, '/evaluation-service/logs');
    }
    dispatch({ type: 'viewedHydrated', payload: storedViewedIds });
  }, []);

  useEffect(() => {
    if (!hasHydratedViewedIds.current) {
      return;
    }

    window.localStorage.setItem(viewedKey, JSON.stringify(state.viewedIds));
  }, [state.viewedIds]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      dispatch({ type: 'loadStarted' });
      await logFrontendEvent('info', 'hook', 'notification load');

      try {
        const notifications = await fetchNotifications({
          page: state.page,
          limit: state.limit,
          notificationType: state.notificationType,
        });

        if (!cancelled) {
          dispatch({ type: 'loadSucceeded', payload: notifications });
        }
      } catch (error) {
        if (!cancelled) {
          dispatch({ type: 'loadFailed', payload: error.message });
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [state.page, state.limit, state.notificationType, tokenRevision]);

  async function updateAccessToken(token) {
    saveAccessToken(token);
    configureFrontendLogger(token, '/evaluation-service/logs');
    setTokenRevision((currentValue) => currentValue + 1);
    await logFrontendEvent('info', 'state', 'token saved');
  }

  return {
    state,
    dispatch,
    updateAccessToken,
    storedToken: getStoredAccessToken(),
  };
}
