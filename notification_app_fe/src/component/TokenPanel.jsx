import React, { useState } from 'react';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { logFrontendEvent } from '@/utils/logger.js';

export function TokenPanel({ defaultValue, onSave }) {
  const [value, setValue] = useState(defaultValue);

  async function handleSave() {
    await onSave(value);
    await logFrontendEvent('info', 'component', 'token panel saved');
  }

  return (
    <Paper sx={{ p: 3, border: '1px solid rgba(15, 76, 92, 0.08)' }}>
      <Stack spacing={2}>
        <Typography variant="h6">Evaluation Access Token</Typography>
        <Typography variant="body2" color="text.secondary">
          Paste the latest access token from the auth API. It stays in local storage so
          you can refresh data without editing code.
        </Typography>
        <TextField
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Paste access token"
          multiline
          minRows={3}
          maxRows={6}
        />
        <Button variant="contained" onClick={handleSave}>
          Save token
        </Button>
      </Stack>
    </Paper>
  );
}
