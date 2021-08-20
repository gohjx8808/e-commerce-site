import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultAddressData } from '../../../utils/constants';

interface accState{
  isEditAccDetailModalDisplay:boolean
  isAddressModalOpen:boolean
  addressActionType:string
  selectedAddress:account.finalSubmitAddEditAddressPayload
  isDeleteAddressConfirmationModalOpen:boolean
}

const INITIAL_STATE:accState = {
  isEditAccDetailModalDisplay: false,
  isAddressModalOpen: false,
  addressActionType: '',
  selectedAddress: defaultAddressData,
  isDeleteAddressConfirmationModalOpen: false,
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
    toggleDeleteAddressConfirmationModal: (state, action:PayloadAction<boolean>) => {
      state.isDeleteAddressConfirmationModalOpen = action.payload;
    },
    deleteAddressAction: (
      _state, _action:PayloadAction,
    ) => {},
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
} = accountSlice.actions;

export default accountSlice.reducer;
