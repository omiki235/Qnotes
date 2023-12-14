import React from 'react';
import { Box } from '@mui/material';
import { Container } from '@mui/system';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h1>Nortion Original</h1>
        </Box>
        <Outlet />
      </Container>
    </div>
  );
}
