import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState{}

const INITIAL_STATE:authState = {
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    submitSignUp: (state, action:PayloadAction<auth.submitSignupPayload>) => {},
  },
});

export const { submitSignUp } = authSlice.actions;

export default authSlice.reducer;
