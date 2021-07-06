import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface statusState {
  isStatusModalOpen: boolean
  isSuccess:boolean
  statusTitle:string
  statusMsg:string
}

const INITIAL_STATE:statusState = {
  isStatusModalOpen: false,
  isSuccess: false,
  statusMsg: '',
  statusTitle: '',
};

export const statusSlice = createSlice({
  name: 'status',
  initialState: INITIAL_STATE,
  reducers: {
    toggleStatusModal: (state, action:PayloadAction<boolean>) => {
      state.isStatusModalOpen = action.payload;
    },
    toggleSuccess: (state, action:PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    updateStatusTitle: (state, action:PayloadAction<string>) => {
      state.statusTitle = action.payload;
    },
    updateStatusMsg: (state, action:PayloadAction<string>) => {
      state.statusMsg = action.payload;
    },
  },
});

export const {
  toggleStatusModal, toggleSuccess, updateStatusTitle, updateStatusMsg,
} = statusSlice.actions;

export default statusSlice.reducer;
