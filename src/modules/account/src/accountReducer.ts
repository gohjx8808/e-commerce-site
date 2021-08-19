import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultAddressData } from '../../../utils/constants';

interface accState{
  isEditAccDetailModalDisplay:boolean
  isAddressModalOpen:boolean
  addressActionType:string
  selectedAddress:account.finalSubmitAddEditAddressPayload
}

const INITIAL_STATE:accState = {
  isEditAccDetailModalDisplay: false,
  isAddressModalOpen: false,
  addressActionType: '',
  selectedAddress: defaultAddressData,
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
      _state, _action:PayloadAction<account.finalSubmitAddEditAddressPayload>,
    ) => {},
    updateAddressActionType: (state, action:PayloadAction<string>) => {
      state.addressActionType = action.payload;
    },
    updateSelectedAddress: (
      state, action:PayloadAction<account.finalSubmitAddEditAddressPayload>,
    ) => {
      state.selectedAddress = action.payload;
    },
  },
});

export const {
  toggleEditAccDetailModal,
  submitEditAccDetailsAction,
  toggleAddressModal,
  submitAddAddressAction,
  updateAddressActionType,
  updateSelectedAddress,
} = accountSlice.actions;

export default accountSlice.reducer;
