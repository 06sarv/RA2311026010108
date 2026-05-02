import React from 'react';
import {
  MenuItem,
  Paper,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { notificationTypes } from '@/state/notificationState.js';

export function NotificationComposer({
  limit,
  notificationType,
  priorityLimit,
  onLimitChange,
  onTypeChange,
  onPriorityLimitChange,
  showPriorityLimit = false,
  showFeedLimit = true,
}) {
  return (
    <Paper sx={{ p: 3, border: '1px solid rgba(15, 76, 92, 0.08)' }}>
      <Stack spacing={3}>
        <Typography variant="h6">Feed Controls</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            select
            label="Notification Type"
            value={notificationType}
            onChange={(event) => onTypeChange(event.target.value)}
            fullWidth
          >
            {notificationTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          {showFeedLimit ? (
            <TextField
              select
              label="Rows per page"
              value={limit}
              onChange={(event) => onLimitChange(Number(event.target.value))}
              fullWidth
            >
              {[5, 10].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          ) : null}
        </Stack>
        {showPriorityLimit ? (
          <Stack spacing={1.5}>
            <Typography variant="body2" color="text.secondary">
              Priority inbox size: {priorityLimit}
            </Typography>
            <Slider
              value={priorityLimit}
              min={3}
              max={20}
              step={1}
              marks
              onChange={(_, value) => onPriorityLimitChange(value)}
            />
          </Stack>
        ) : null}
      </Stack>
    </Paper>
  );
}
