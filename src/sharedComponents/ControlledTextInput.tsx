import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
  unFocusStyle: {
    color: 'white',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'lightgrey',
    },
  },
  unFocusLabel: {
    color: 'white',
  },
});

const ControlledTextInput = (props:ControlledTextInputOwnProps) => {
  const {
    control, label, type, variant, name, defaultValue, error,
  } = props;

  const styles = useStyles();

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
          style={{
            width: '80%', marginTop: 5, marginBottom: 5, display: type === 'hidden' ? 'none' : 'flex',
          }}
          InputProps={{
            classes: {
              root: styles.unFocusStyle,
            },
          }}
          InputLabelProps={{ classes: { root: styles.unFocusLabel } }}
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
