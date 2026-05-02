import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

export function NotificationShell({ eyebrow, title, subtitle, children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, rgba(217,93,57,0.16), transparent 32%), radial-gradient(circle at top right, rgba(15,76,92,0.14), transparent 30%), #f4f1ea',
        pb: 8,
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(244, 241, 234, 0.88)',
          borderBottom: '1px solid rgba(15, 76, 92, 0.08)',
          color: 'primary.main',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            py: 1,
            gap: 1.5,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
            <Chip label="Campus Console" color="secondary" />
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}
            >
              Notification Operations
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ width: { xs: '100%', sm: 'auto' }, flexWrap: 'wrap' }}
          >
            <Button component={NavLink} to="/" color="inherit">
              All Notifications
            </Button>
            <Button component={NavLink} to="/priority" color="inherit">
              Priority Inbox
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ pt: { xs: 3, md: 6 }, px: { xs: 2, sm: 3 } }}>
        <Stack spacing={1.5} sx={{ mb: 4 }}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: '0.18em', color: 'secondary.main', fontWeight: 700 }}
          >
            {eyebrow}
          </Typography>
          <Typography variant="h3" sx={{ fontSize: { xs: '2.4rem', md: '3rem' } }}>
            {title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: 780,
              color: 'text.secondary',
              fontSize: { xs: '1.05rem', md: '1.25rem' },
            }}
          >
            {subtitle}
          </Typography>
        </Stack>
        {children}
      </Container>
    </Box>
  );
}
