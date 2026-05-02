export const notificationTypes = ['All', 'Placement', 'Result', 'Event'];

export const typeWeights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const initialState = {
  notifications: [],
  status: 'idle',
  error: '',
  page: 1,
  limit: 10,
  notificationType: 'All',
  priorityLimit: 5,
  selectedNotification: null,
  viewedIds: [],
};

export function notificationsReducer(state, action) {
  switch (action.type) {
    case 'loadStarted':
      return {
        ...state,
        status: 'loading',
        error: '',
      };
    case 'loadSucceeded':
      return {
        ...state,
        status: 'success',
        notifications: action.payload,
      };
    case 'loadFailed':
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    case 'pageChanged':
      return {
        ...state,
        page: action.payload,
      };
    case 'limitChanged':
      return {
        ...state,
        page: 1,
        limit: action.payload,
      };
    case 'typeChanged':
      return {
        ...state,
        page: 1,
        notificationType: action.payload,
      };
    case 'priorityLimitChanged':
      return {
        ...state,
        priorityLimit: action.payload,
      };
    case 'notificationOpened': {
      const nextViewedIds = state.viewedIds.includes(action.payload.ID)
        ? state.viewedIds
        : [...state.viewedIds, action.payload.ID];

      return {
        ...state,
        selectedNotification: action.payload,
        viewedIds: nextViewedIds,
      };
    }
    case 'notificationClosed':
      return {
        ...state,
        selectedNotification: null,
      };
    case 'viewedHydrated':
      return {
        ...state,
        viewedIds: action.payload,
      };
    default:
      return state;
  }
}

export function scoreNotification(notification) {
  return {
    weight: typeWeights[notification.Type] || 0,
    timestamp: Date.parse(notification.Timestamp.replace(' ', 'T')),
  };
}

export function getPriorityNotifications(notifications, limit) {
  return [...notifications]
    .sort((left, right) => {
      const leftScore = scoreNotification(left);
      const rightScore = scoreNotification(right);

      if (rightScore.weight !== leftScore.weight) {
        return rightScore.weight - leftScore.weight;
      }

      return rightScore.timestamp - leftScore.timestamp;
    })
    .slice(0, limit);
}

export function getStatusBreakdown(notifications) {
  return notifications.reduce(
    (summary, notification) => {
      summary.total += 1;
      summary[notification.Type] += 1;
      return summary;
    },
    {
      total: 0,
      Placement: 0,
      Result: 0,
      Event: 0,
    }
  );
}
