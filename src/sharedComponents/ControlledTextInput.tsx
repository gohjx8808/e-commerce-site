import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

type variantData='standard' | 'filled' | 'outlined'

interface ControlledTextInputOwnProps{
  control:Control,
  label?:string,
  type?:string,
  variant?:variantData,
  name:string,
  defaultValue?:string
  error?:FieldError
}

const ControlledTextInput = (props:ControlledTextInputOwnProps) => {
  const {
    control, label, type, variant, name, defaultValue, error,
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <TextField
          type={type}
          label={label}
          onChange={onChange}
          value={value}
          variant={variant}
          error={!!error}
          helperText={error?.message}
          style={{ width: '80%', marginTop: 5, marginBottom: 5 }}
        />
      )}
      defaultValue={defaultValue}
    />
  );
};

ControlledTextInput.defaultProps = {
  defaultValue: '',
  variant: undefined,
  type: '',
  label: '',
  error: null,
};

export default ControlledTextInput;
