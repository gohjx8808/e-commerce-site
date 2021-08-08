import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const signupSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*,.()\-+_={}[\]{};'\\:"|\\/<>?~`])(?=.{8})/,
      'Password must contain minimum 8 characters | at least 1 uppercase and 1 lowercase | at least 1 number | at least 1 special character',
    ),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords do not match.'),
  dob: yup.string().required('Date of birth is required'),
  gender: yup.object().shape({
    value: yup.string().required('Gender is required'),
    label: yup.string().required('Gender is required'),
  }).typeError('Gender is required'),
  phoneNumber: yup.number().required('Phone number is required').typeError('Invalid phone number'),
  fullName: yup.string().required('Full name is required'),
});
