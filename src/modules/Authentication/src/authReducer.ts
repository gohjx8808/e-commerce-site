import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE:auth.State = {
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
