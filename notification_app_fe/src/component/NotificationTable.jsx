import React from 'react';
import {
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const typeColors = {
  Placement: 'secondary',
  Result: 'primary',
  Event: 'success',
};

export function NotificationTable({ notifications, viewedIds, onOpen }) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'rgba(15, 76, 92, 0.06)' }}>
            <TableCell>Status</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notifications.map((notification) => {
            const isViewed = viewedIds.includes(notification.ID);

            return (
              <TableRow
                hover
                key={notification.ID}
                onClick={() => onOpen(notification)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: isViewed
                    ? 'transparent'
                    : 'rgba(217, 93, 57, 0.08)',
                }}
              >
                <TableCell>
                  <Chip
                    size="small"
                    label={isViewed ? 'Viewed' : 'New'}
                    color={isViewed ? 'default' : 'secondary'}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={notification.Type}
                    color={typeColors[notification.Type] || 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Stack spacing={0.25}>
                    <Typography fontWeight={700}>{notification.Message}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.ID}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>{notification.Timestamp}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
