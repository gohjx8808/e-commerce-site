import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
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
  labelWidth?:number
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
    control, label, type, variant, name, defaultValue, error, labelWidth,
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
        <FormControl
          variant={variant}
          style={{
            width: '80%', marginTop: 5, marginBottom: 5, display: type === 'hidden' ? 'none' : 'flex',
          }}
        >
          <InputLabel htmlFor="outlined-text" classes={{ root: styles.unFocusLabel }}>{label}</InputLabel>
          <OutlinedInput
            id="outlined-text"
            type={type}
            value={value}
            onChange={onChange}
            labelWidth={labelWidth}
            classes={{ root: styles.unFocusStyle }}
            error={!!error}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </FormControl>
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
  labelWidth: 70,
};

export default ControlledTextInput;
