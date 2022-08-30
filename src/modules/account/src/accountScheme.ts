import * as yup from 'yup';

export const editAccountSchema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  gender: yup.object().shape({
    label: yup.string().required('Gender is required'),
    value: yup.string().required('Gender is required'),
  }).typeError('Invalid gender'),
  email: yup.string().required('Email is required').email('Invalid email'),
  phoneNo: yup.number().required().typeError('Invalid phone number'),
  dob: yup.string().required('Date of birth is required'),
});

export const addressSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup.number().typeError('Phone number is required'),
  addressLine1: yup.string().required('Address line 1 is required'),
  postcode: yup.number().typeError('Invalid postcode'),
  city: yup.string().required('City is required'),
  state: yup.object().shape({
    label: yup.string().required('State is required'),
    value: yup.string().required('State is required'),
  }).typeError('State is required'),
  outsideMalaysiaState: yup.string().when('state', {
    is: (state:optionsData) => state && state.value === 'Outside Malaysia',
    then: yup.string().required('Foreign country state is required'),
  }),
  country: yup.string().required('Country is required'),
  defaultOption: yup.string().required('Default option is required'),
});
