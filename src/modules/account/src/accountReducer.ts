import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface accState{
  isEditAccDetailModalDisplay:boolean
  isAddressModalOpen:boolean
  addressActionType:string
}

const INITIAL_STATE:accState = {
  isEditAccDetailModalDisplay: false,
  isAddressModalOpen: false,
  addressActionType: '',
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
    toggleAddressModal: (state, action:PayloadAction<boolean>) => {
      state.isAddressModalOpen = action.payload;
    },
    submitAddAddressAction: (
      _state, _action:PayloadAction<account.submitAddEditAddressPayload>,
    ) => {},
    updateAddressActionType: (state, action:PayloadAction<string>) => {
      state.addressActionType = action.payload;
    },
  },
});

export const {
  toggleEditAccDetailModal,
  submitEditAccDetailsAction,
  toggleAddressModal,
  submitAddAddressAction,
  updateAddressActionType,
} = accountSlice.actions;

export default accountSlice.reducer;
