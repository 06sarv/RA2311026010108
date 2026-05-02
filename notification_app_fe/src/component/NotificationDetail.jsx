import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

export function NotificationDetail({ notification, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{notification?.Message || 'Notification detail'}</DialogTitle>
      <DialogContent>
        {notification ? (
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              {notification.ID}
            </Typography>
            <Divider />
            <Typography>
              <strong>Type:</strong> {notification.Type}
            </Typography>
            <Typography>
              <strong>Timestamp:</strong> {notification.Timestamp}
            </Typography>
            <Typography>
              This view marks the notification as viewed on this browser so the feed can
              distinguish between new and previously opened items.
            </Typography>
          </Stack>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
