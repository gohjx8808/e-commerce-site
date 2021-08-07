import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const editAccountSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  gender: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
  }).typeError('Invalid gender'),
  email: yup.string().required('Email is required').email('Invalid email'),
  phoneNumber: yup.number().required().typeError('Invalid phone number'),
  dob: yup.string().required('Date of birth is required'),
});
