import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface overlayState{
  isLoadingOverlayOpen:boolean
}

const INITIAL_STATE:overlayState = {
  isLoadingOverlayOpen: false,
};

export const overlaySlice = createSlice({
  name: 'overlay',
  initialState: INITIAL_STATE,
  reducers: {
    toggleLoadingOverlay: (state, action:PayloadAction<boolean>) => {
      state.isLoadingOverlayOpen = action.payload;
    },
  },
});

export const { toggleLoadingOverlay } = overlaySlice.actions;

export default overlaySlice.reducer;
