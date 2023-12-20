import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <Box component="form" noValidate>
        <TextField
          id="username"
          label="名前"
          margin="normal"
          name="username"
          required
          fullWidth
        />
        <TextField
          id="password"
          type="password"
          label="パスワード"
          margin="normal"
          name="password"
          required
          fullWidth
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          type="submit"
          color="primary"
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
