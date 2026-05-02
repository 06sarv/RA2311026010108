import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { NotificationDashboard } from './page/NotificationDashboard.jsx';
import { PriorityInboxPage } from './page/PriorityInboxPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <NotificationDashboard />,
  },
  {
    path: '/priority',
    element: <PriorityInboxPage />,
  },
]);
