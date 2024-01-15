import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { Container } from '@mui/system';
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../../utils/authUtils';

export default function AuthLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // JSTを持っているのかを確認する
    const checkAuth = async () => {
      // 認証チェック
      const isAuth = await authUtils.isAuthenticated();
      if (isAuth) {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

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
          <h1>Qnotes2</h1>
        </Box>
        <Outlet />
      </Container>
    </div>
  );
}
