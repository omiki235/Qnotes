import React from 'react';
import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function Home() {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingButton variant="outlined">新規メモ作成</LoadingButton>
    </Box>
  );
}
