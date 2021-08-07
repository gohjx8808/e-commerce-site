import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState{
  currentUser:auth.currentUserDetails
}

const INITIAL_STATE:authState = {
  currentUser: {
    uid: '',
    dob: '',
    gender: '',
    fullName: '',
    email: '',
    phoneNumber: '',
  },
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
  },
});

export const {
  submitSignUp, submitSignIn, storeSignedInUser, getCurrentUserDetailsAction,
} = authSlice.actions;

export default authSlice.reducer;
