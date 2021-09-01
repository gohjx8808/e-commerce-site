import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INTIAL_STATE = {};

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: INTIAL_STATE,
  reducers: {
    submitFeedback: (_state, _action:PayloadAction<feedback.submitFeedbackFormPayload>) => {},
  },
});

export const { submitFeedback } = feedbackSlice.actions;

export default feedbackSlice.reducer;
