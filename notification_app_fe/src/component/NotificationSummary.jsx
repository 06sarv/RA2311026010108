import React from 'react';
import { Grid, Paper, Stack, Typography } from '@mui/material';

const summaryCards = [
  { key: 'total', label: 'Loaded in current page' },
  { key: 'Placement', label: 'Placements' },
  { key: 'Result', label: 'Results' },
  { key: 'Event', label: 'Events' },
];

export function NotificationSummary({ summary }) {
  return (
    <Grid container spacing={2}>
      {summaryCards.map((card) => (
        <Grid key={card.key} size={{ xs: 12, sm: 6, lg: 3 }}>
          <Paper
            sx={{
              p: 2.5,
              border: '1px solid rgba(15, 76, 92, 0.08)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,248,238,0.94))',
            }}
          >
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                {card.label}
              </Typography>
              <Typography variant="h4">{summary[card.key]}</Typography>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
