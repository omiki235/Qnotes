import React from 'react';
import { Box } from '@mui/material';

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
      <h1>新規ページボタンからメモを作成しよう</h1>
    </Box>
  );
}
