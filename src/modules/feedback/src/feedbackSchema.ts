import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const feedbackFormSchema = yup.object({
  name: yup.string().required('Nickname is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
  feedback: yup.string().required('Feedback is required'),
});
