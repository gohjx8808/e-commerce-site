import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface accState{
  isEditAccDetailModalDisplay:boolean
}

const INITIAL_STATE:accState = {
  isEditAccDetailModalDisplay: false,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState: INITIAL_STATE,
  reducers: {
    toggleEditAccDetailModal: (state, action:PayloadAction<boolean>) => {
      state.isEditAccDetailModalDisplay = action.payload;
    },
    submitEditAccDetailsAction: (
      _state, _action:PayloadAction<account.submitEditAccDetailPayload>,
    ) => {},
  },
});

export const { toggleEditAccDetailModal, submitEditAccDetailsAction } = accountSlice.actions;

export default accountSlice.reducer;
