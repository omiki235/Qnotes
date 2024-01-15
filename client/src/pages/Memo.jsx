import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { TextField, Button, Input } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateMemo } from '../redux/features/memoSlice';
import memoApi from '../api/memoApi';

export default function Memo() {
  const { memoId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        setTitle(res.title);
        setDescription(res.description);
        const newImageUrl = res.imagePath
          ? `http://3.114.228.146:8000/${res.imagePath}`
          : null;
        setSelectedImage(newImageUrl);
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
      setSelectedImage((currentImage) => currentImage);
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

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await memoApi.uploadImage(memoId, formData);
      if (response.filename) {
        const newImageUrl = `http://localhost:8000/uploads/${response.filename}`;
        setSelectedImage(newImageUrl);
      }
    } catch (err) {
      alert('画像のアップロードに失敗しました。');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
      e.target.value = null;
    }
  };

  const handleImageUploadClick = () => {
    document.getElementById('hiddenFileInput').click();
  };

  const handleMemoUpdate = (updatedMemo) => {
    dispatch(updateMemo({ id: updatedMemo.id, updatedData: updatedMemo }));
  };

  return (
    <>
      <Box sx={{ padding: '100px 150px' }}>
        <Input
          type="file"
          id="hiddenFileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleImageUploadClick}
        >
          画像をアップロード
        </Button>
        <Box sx={{ margin: '50px' }}>
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
          />
          <textarea
            onChange={updateDescription}
            value={description || ''}
            placeholder="ご自由にご記入ください"
            style={{
              width: '100%',
              fontSize: '1.2rem',
              padding: '10px',
            }}
          />
          <Box sx={{ margin: '100px 50px' }}>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Memo"
                style={{ maxWidth: '500px', maxHeight: '300px' }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
