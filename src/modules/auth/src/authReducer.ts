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
  },
});

export const { submitSignUp, submitSignIn, storeSignedInUser } = authSlice.actions;

export default authSlice.reducer;
