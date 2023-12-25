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

      const memoToUpdate = state.value.find((memo) => memo.id === id);

      if (memoToUpdate) {
        Object.assign(memoToUpdate, updatedData);
      }
    },
  },
});

export const { setMemo, createMemo, updateMemo } = memoSlice.actions;
export default memoSlice.reducer;
