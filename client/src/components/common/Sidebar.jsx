import React, { useEffect, useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  createMemo,
  setMemo,
  deleteMemo,
} from '../../redux/features/memoSlice';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LogoutIcon from '@mui/icons-material/Logout';
import assets from '../../assets/index';
import AddBoxIcon from '@mui/icons-material/AddBox';
import memoApi from '../../api/memoApi';

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memo.value);
  const { memoId } = useParams();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        dispatch(setMemo(res));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  useEffect(() => {
    const activeIndex = memos.findIndex((e) => e.id === memoId);
    setActiveIndex(activeIndex);
  }, [memoId, memos, navigate]);

  const addMemo = async () => {
    try {
      const res = await memoApi.create();
      dispatch(createMemo(res));
      navigate(`/memo/${res.id}`);
    } catch (err) {
      alert(err);
    }
  };

  const deleteMemoHandler = async (deletedMemoId) => {
    try {
      await memoApi.delete(deletedMemoId);
      dispatch(deleteMemo(deletedMemoId));
      const newMemos = memos.filter((e) => e.id !== deletedMemoId);

      if (newMemos.length > 0) {
        const currentIndex = newMemos.findIndex(
          (memo) => memo.id === deletedMemoId
        );
        const nextIndex = (currentIndex + 1) % newMemos.length;
        const nextMemoId = newMemos[nextIndex].id;
        navigate(`/memo/${nextMemoId}`);
      } else {
        navigate('/memo');
      }
    } catch (err) {
      alert('Error deleting memo. Please try again.');
    }
  };

  const handleMemoUpdate = (updatedMemo) => {
    dispatch(
      setMemo(
        memos.map((memo) => (memo.id === updatedMemo.id ? updatedMemo : memo))
      )
    );
  };

  const handleImageUpload = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      console.log('Selected file:', file);
      if (file) {
        try {
          const formData = new FormData();
          formData.append('image', file);
          console.log('Form Data with File:', formData);
          await memoApi.uploadImage(memoId, formData);
          const updatedMemo = await memoApi.getOne(memoId);
          handleMemoUpdate(updatedMemo);
        } catch (err) {
          alert('Error uploading image. Please try again.');
        }
      }
    });
    fileInput.click();
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: '100vh' }}
    >
      <List
        sx={{
          width: 300,
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
            <Typography variant="body2" fontWeight="700" paddingLeft="20px">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutIcon />
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
          ></Box>
        </ListItemButton>

        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: '20px',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              新規ページ
            </Typography>
            <IconButton onClick={addMemo}>
              <AddBoxIcon />
            </IconButton>
          </Box>
        </ListItemButton>

        {memos.map((item, index) => (
          <ListItemButton
            sx={{ pl: '20px' }}
            component={Link}
            to={`/memo/${item.id}`}
            key={item.id}
            selected={index === activeIndex}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
              >
                <DescriptionIcon sx={{ fontSize: '2.0rem' }} />
                <Typography component="span">{item.title || '無題'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => deleteMemoHandler(item.id)}>
                  <DeleteOutlineIcon />
                </IconButton>
                <IconButton onClick={handleImageUpload}>
                  <PhotoCameraIcon />
                </IconButton>
              </Box>
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
