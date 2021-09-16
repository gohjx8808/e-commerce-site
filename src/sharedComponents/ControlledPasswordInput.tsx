import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput, { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import React, { useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

type variantData='standard' | 'filled' | 'outlined'

interface ControlledPasswordInputOwnProps extends OutlinedInputProps{
  control:Control,
  label?:string,
  variant?:variantData,
  formerror?:FieldError
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
  container: {
    width: '100%',
  },
  removedAutofillStyling: {
    '&:-webkit-autofill': {
      transitionDelay: '9999s',
    },
    '&:-webkit-autofill::first-line': {
      fontFamily: 'Sitka Display Semibold',
      fontSize: '1rem',
    },
  },
});

const ControlledPasswordInput = (props:ControlledPasswordInputOwnProps) => {
  const {
    control, label, variant, name, defaultValue, formerror,
  } = props;

  const [secure, setSecure] = useState(true);

  const styles = useStyles();

  return (
    <Controller
      control={control}
      name={name!}
      render={({
        field: {
          onChange,
        },
      }) => (
        <FormControl variant={variant} className={styles.container}>
          <InputLabel htmlFor={name} classes={{ root: styles.unFocusLabel }} error={!!formerror}>
            {label}
          </InputLabel>
          <OutlinedInput
            id={name}
            type={!secure ? 'text' : 'password'}
            onChange={onChange}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setSecure(!secure)}
                  edge="end"
                  className={styles.unFocusLabel}
                >
                  {!secure ? <VisibilityIcon color={formerror ? 'error' : 'inherit'} /> : <VisibilityOffIcon color={formerror ? 'error' : 'inherit'} />}
                </IconButton>
                {formerror
                && (
                  <IconButton
                    edge="end"
                  >
                    <CancelIcon color="error" />
                  </IconButton>
                )}
              </InputAdornment>
            )}
            classes={{ root: styles.unFocusStyle, input: styles.removedAutofillStyling }}
            error={!!formerror}
            {...props}
          />
          <FormHelperText error>{formerror?.message}</FormHelperText>
        </FormControl>
      )}
      defaultValue={defaultValue}
    />
  );
};

ControlledPasswordInput.defaultProps = {
  variant: undefined,
  label: '',
  formerror: null,
};

export default ControlledPasswordInput;
