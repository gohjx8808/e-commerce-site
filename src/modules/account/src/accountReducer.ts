import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultAddressData } from '../../../utils/constants';

interface accState{
  isEditAccDetailModalDisplay:boolean
  isAddressModalOpen:boolean
  addressActionType:string
  selectedAddress:account.submitAddEditAddressPayload
  isDeleteAddressConfirmationModalOpen:boolean
  isDirectAction:boolean
}

const INITIAL_STATE:accState = {
  isEditAccDetailModalDisplay: false,
  isAddressModalOpen: false,
  addressActionType: '',
  selectedAddress: defaultAddressData,
  isDeleteAddressConfirmationModalOpen: false,
  isDirectAction: true,
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
    submitAddEditAddressAction: (
      _state, _action:PayloadAction<account.submitAddEditAddressPayload>,
    ) => {},
    updateAddressActionType: (state, action:PayloadAction<string>) => {
      state.addressActionType = action.payload;
    },
    updateSelectedAddress: (
      state, action:PayloadAction<account.submitAddEditAddressPayload>,
    ) => {
      state.selectedAddress = action.payload;
    },
    toggleDeleteAddressConfirmationModal: (state, action:PayloadAction<boolean>) => {
      state.isDeleteAddressConfirmationModalOpen = action.payload;
    },
    deleteAddressAction: (
      _state, _action:PayloadAction,
    ) => {},
    toggleIsDirectAction: (state, action:PayloadAction<boolean>) => {
      state.isDirectAction = action.payload;
    },
  },
});

export const {
  toggleEditAccDetailModal,
  submitEditAccDetailsAction,
  toggleAddressModal,
  submitAddEditAddressAction,
  updateAddressActionType,
  updateSelectedAddress,
  deleteAddressAction,
  toggleDeleteAddressConfirmationModal,
  toggleIsDirectAction,
} = accountSlice.actions;

export default accountSlice.reducer;
