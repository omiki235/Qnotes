import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { setUser } from '../../redux/features/userSlice';
import { useDispatch } from 'react-redux';
import Sidebar from '../common/Sidebar';
import authUtils from '../../utils/authUtils';

export default function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // JWTを持っているのか確認する
    const checkAuth = async () => {
      // 認証チェック
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate('/login');
      } else {
        // ユーザーを保存する
        dispatch(setUser(user));
      }
    };
    checkAuth();
  }, [dispatch, navigate]);
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: 'max-content' }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}
