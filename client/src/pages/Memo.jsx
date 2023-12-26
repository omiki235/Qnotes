import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateMemo } from '../redux/features/memoSlice';
import memoApi from '../api/memoApi';

export default function Memo() {
  const { memoId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        setTitle(res.title);
        setDescription(res.description);
      } catch (err) {
        alert(err);
      }
    };
    getMemo();
  }, [memoId]);

  let timer;
  const timeout = 500;

  const updateMemoInApi = async (updates) => {
    clearTimeout(timer);
    try {
      await memoApi.update(memoId, updates);
      const updatedMemo = await memoApi.getOne(memoId);
      handleMemoUpdate(updatedMemo);
    } catch (err) {
      alert(err);
    }
  };

  const updateTitle = async (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(() => {
      updateMemoInApi({ title: newTitle, description });
    }, timeout);
  };

  const updateDescription = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(() => {
      updateMemoInApi({ title, description: newDescription });
    }, timeout);
  };

  const handleMemoUpdate = (updatedMemo) => {
    dispatch(updateMemo({ id: updatedMemo.id, updatedData: updatedMemo }));
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      ></Box>

      <Box sx={{ padding: '10px 50px' }}>
        <Box>
          <TextField
            onChange={updateTitle}
            value={title !== null ? title : ''}
            placeholder="無題"
            variant="outlined"
            fullWidth
            sx={{
              '.MuiOutlinedInput-input': { padding: 0 },
              '.MuiOutlinedInput-notchedOutline': { border: 'none' },
              '.MuiOutlinedInput-root': {
                fontSize: '2.5rem',
                fontWeight: '700',
              },
            }}
          ></TextField>
          <TextField
            onChange={updateDescription}
            value={description !== null ? description : ''}
            placeholder="ご自由にご記入ください"
            variant="outlined"
            fullWidth
            sx={{
              '.MuiOutlinedInput-input': { padding: 0 },
              '.MuiOutlinedInput-notchedOutline': { border: 'none' },
              '.MuiOutlinedInput-root': { fontSize: '1.2rem' },
            }}
          ></TextField>
        </Box>
      </Box>
    </>
  );
}
