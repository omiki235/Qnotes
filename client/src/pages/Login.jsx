import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameErrorText, setUsernameErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrorText('');
    setPasswordErrorText('');

    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();

    let error = false;

    if (username === '') {
      error = true;
      setUsernameErrorText('名前を入力してください');
    }
    if (password === '') {
      error = true;
      setPasswordErrorText('パスワードを入力してください');
    }

    if (error) return;

    setLoading(true);

    try {
      const res = await authApi.login({
        username,
        password,
      });
      setLoading(false);
      localStorage.setItem('token', res.token);
      console.log('ログインに成功しました');
      navigate('/');
    } catch (err) {
      console.log(err);
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((err) => {
        if (err.param === 'username') {
          setUsernameErrorText(err.msg);
        }
        if (err.param === 'password') {
          setPasswordErrorText(err.msg);
        }
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="お名前"
          name="username"
          disabled={loading}
          required
          error={usernameErrorText !== ''}
          helperText={usernameErrorText}
        />
        <TextField
          margin="normal"
          fullWidth
          id="password"
          label="パスワード"
          name="password"
          disabled={loading}
          type="password"
          required
          error={passwordErrorText !== ''}
          helperText={passwordErrorText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="primary"
          type="submit"
          loading={loading}
        >
          ログイン
        </LoadingButton>
        <Button component={Link} to="/register" sx={{ textTransform: 'none' }}>
          アカウントがない場合はこちら →
        </Button>
      </Box>
    </>
  );
}
