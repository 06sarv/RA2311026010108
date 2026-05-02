import React from 'react';
import { Pagination, Paper, Stack, Typography } from '@mui/material';

export function PaginationStrip({ page, onChange, hasFullPage, countHint }) {
  return (
    <Paper sx={{ p: 2.5, border: '1px solid rgba(15, 76, 92, 0.08)' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Typography variant="body2" color="text.secondary">
          {hasFullPage
            ? `At least ${countHint} records are available across pages.`
            : 'The current page has fewer rows than the selected limit.'}
        </Typography>
        <Pagination
          color="primary"
          page={page}
          count={Math.max(page + (hasFullPage ? 1 : 0), 1)}
          onChange={(_, value) => onChange(value)}
        />
      </Stack>
    </Paper>
  );
}
