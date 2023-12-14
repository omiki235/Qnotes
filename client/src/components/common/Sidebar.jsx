import React from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import assets from '../../assets';
import { Box } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function Sidebar() {
  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: '100vh' }}
    >
      <List
        sx={{
          width: 250,
          height: '100vh',
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {/* {user.username} */}
              testUser
            </Typography>
            <IconButton>
              <LogoutIcon></LogoutIcon>
            </IconButton>
          </Box>
        </ListItemButton>

        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
            <IconButton></IconButton>
          </Box>
        </ListItemButton>

        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton
            // onClick={addMemo}
            >
              <AddBoxIcon />
            </IconButton>
          </Box>
        </ListItemButton>

        <ListItemButton
          sx={{ pl: '20px' }}
          // component={Link}

          // selected={index === activeIndex}
        >
          <Typography></Typography>
        </ListItemButton>
      </List>
    </Drawer>
  );
}
