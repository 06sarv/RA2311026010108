import React from 'react';
import { Chip, Paper, Stack, Typography } from '@mui/material';

export function LogFeed({ items }) {
  return (
    <Paper sx={{ p: 3, border: '1px solid rgba(15, 76, 92, 0.08)' }}>
      <Stack spacing={2}>
        <Typography variant="h6">Recent Frontend Logs</Typography>
        <Stack spacing={1}>
          {items.map((item) => (
            <Stack
              key={item.id}
              direction={{ xs: 'column', md: 'row' }}
              spacing={1.5}
              alignItems={{ xs: 'flex-start', md: 'center' }}
            >
              <Chip size="small" color="primary" label={item.level} />
              <Typography variant="body2" sx={{ minWidth: 84 }}>
                {item.packageName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.message}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}
