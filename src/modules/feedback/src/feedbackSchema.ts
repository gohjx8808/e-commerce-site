import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const feedbackFormSchema = yup.object({
  feedback: yup.string().required('Feedback is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
});
