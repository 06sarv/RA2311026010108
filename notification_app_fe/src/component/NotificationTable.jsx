import React from 'react';
import {
  Box,
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
    <>
      <Stack spacing={2} sx={{ display: { xs: 'flex', md: 'none' } }}>
        {notifications.map((notification) => {
          const isViewed = viewedIds.includes(notification.ID);

          return (
            <Paper
              key={notification.ID}
              onClick={() => onOpen(notification)}
              sx={{
                p: 2,
                borderRadius: 4,
                cursor: 'pointer',
                border: '1px solid rgba(15, 76, 92, 0.08)',
                backgroundColor: isViewed ? 'background.paper' : 'rgba(217, 93, 57, 0.08)',
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip
                    size="small"
                    label={isViewed ? 'Viewed' : 'New'}
                    color={isViewed ? 'default' : 'secondary'}
                  />
                  <Chip
                    size="small"
                    label={notification.Type}
                    color={typeColors[notification.Type] || 'default'}
                  />
                </Stack>
                <Typography fontWeight={700} sx={{ fontSize: '1.1rem' }}>
                  {notification.Message}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {notification.Timestamp}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ wordBreak: 'break-word' }}
                >
                  {notification.ID}
                </Typography>
              </Stack>
            </Paper>
          );
        })}
      </Stack>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          display: { xs: 'none', md: 'block' },
        }}
      >
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
    </>
  );
}
