import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState{
  currentUser:auth.currentUserDetails
  isSignOutConfirmationModalOpen:boolean
}

const INITIAL_STATE:authState = {
  currentUser: {
    uid: '',
    dob: '',
    gender: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    addressBook: [],
    usedPromocode: [],
    roles: {
      admin: false,
      customer: false,
    },
  },
  isSignOutConfirmationModalOpen: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    storeSignedInUser: (state, action:PayloadAction<auth.currentUserDetails>) => {
      state.currentUser = action.payload;
    },
    getCurrentUserDetailsAction: (_state, _action:PayloadAction<string>) => {},
  },
});

export const {
  storeSignedInUser,
  getCurrentUserDetailsAction,
} = authSlice.actions;

export default authSlice.reducer;
