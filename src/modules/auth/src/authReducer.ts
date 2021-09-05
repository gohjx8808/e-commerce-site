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
  },
  isSignOutConfirmationModalOpen: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    submitSignUp: (_state, _action:PayloadAction<auth.submitSignupPayload>) => {},
    submitSignIn: (_state, _action:PayloadAction<auth.submitSignInPayload>) => {},
    storeSignedInUser: (state, action:PayloadAction<auth.currentUserDetails>) => {
      state.currentUser = action.payload;
    },
    getCurrentUserDetailsAction: (_state, _action:PayloadAction<string>) => {},
    signOutAction: (_state) => {},
    toggleSignOutConfirmationModal: (state, action:PayloadAction<boolean>) => {
      state.isSignOutConfirmationModalOpen = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = INITIAL_STATE.currentUser;
    },
    submitForgotPassword: (_state, _action:PayloadAction<auth.submitForgotPasswordPayload>) => {},
  },
});

export const {
  submitSignUp,
  submitSignIn,
  storeSignedInUser,
  getCurrentUserDetailsAction,
  signOutAction,
  toggleSignOutConfirmationModal,
  clearCurrentUser,
  submitForgotPassword,
} = authSlice.actions;

export default authSlice.reducer;
