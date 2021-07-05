import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface statusState {
  isStatusModalOpen: boolean
}

const INITIAL_STATE:statusState = {
  isStatusModalOpen: false,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState: INITIAL_STATE,
  reducers: {
    toggleStatusModal: (state, action:PayloadAction<boolean>) => {
      state.isStatusModalOpen = action.payload;
    },
  },
});

export const { toggleStatusModal } = statusSlice.actions;

export default statusSlice.reducer;
