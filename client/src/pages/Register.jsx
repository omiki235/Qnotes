import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function Register() {
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
        <TextField
          id="confirmPassword"
          type="password"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          required
          fullWidth
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          color="primary"
          variant="outlined"
        >
          アカウント作成
        </LoadingButton>
        <Button to="/login">アカウントお持ちの方</Button>
      </Box>
    </>
  );
}
