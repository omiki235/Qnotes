import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

export default function Register() {
  const navigate = useNavigate();
  const [usernameErrorText, setUsernameErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrorText('');
    setPasswordErrorText('');
    setConfirmPasswordErrorText('');

    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();
    const confirmPassword = data.get('confirmPassword').trim();

    let error = false;

    if (username === '') {
      error = true;
      setUsernameErrorText('ユーザー名を入力してください');
    }
    if (password === '') {
      error = true;
      setPasswordErrorText('パスワードを入力してください');
    }
    if (confirmPassword === '') {
      error = true;
      setConfirmPasswordErrorText('確認用パスワードを入力してください');
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmPasswordErrorText(
        'パスワードと確認用パスワードが一致していません。'
      );
    }

    if (error) return;

    // ローディング開始
    setLoading(true);

    // 新規登録APIの取得
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      localStorage.setItem('token', res.token);
      console.log('新規登録に成功しました');
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
        if (err.param === 'confirmPassword') {
          setConfirmPasswordErrorText(err.msg);
        }
      });
      setLoading(false);
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          disabled={loading}
          required
          fullWidth
          helperText={usernameErrorText}
          error={usernameErrorText !== ''}
        />
        <TextField
          id="password"
          type="password"
          label="パスワード"
          margin="normal"
          name="password"
          disabled={loading}
          required
          fullWidth
          helperText={passwordErrorText}
          error={passwordErrorText !== ''}
        />
        <TextField
          id="confirmPassword"
          type="password"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          disabled={loading}
          required
          fullWidth
          helperText={confirmPasswordErrorText}
          error={confirmPasswordErrorText !== ''}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        アカウントお持ちの方
      </Button>
    </>
  );
}
