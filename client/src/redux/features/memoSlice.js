import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: [] };

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    setMemo: (state, action) => {
      state.value = action.payload;
    },
    createMemo: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    updateMemo: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.value.findIndex((memo) => memo.id === id);
      if (index !== -1) {
        state.value[index] = { ...state.value[index], ...updatedData };
      }
    },
    deleteMemo: (state, action) => {
      const deletedMemoId = action.payload;
      state.value = state.value.filter((memo) => memo.id !== deletedMemoId);
    },
  },
});

export const { setMemo, createMemo, updateMemo, deleteMemo } =
  memoSlice.actions;
export default memoSlice.reducer;
