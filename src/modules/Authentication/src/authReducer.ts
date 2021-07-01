import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE:auth.State = {
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    submitSignUp: () => { console.log('yes'); },
  },
});

export const { submitSignUp } = authSlice.actions;

export default authSlice.reducer;
