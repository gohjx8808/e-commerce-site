import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput, { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import CancelIcon from '@material-ui/icons/Cancel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import React, { useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import useInputsStyles from '../src/useInputsStyles';

type variantData='standard' | 'filled' | 'outlined'

interface ControlledPasswordInputOwnProps extends OutlinedInputProps{
  control:Control,
  label?:string,
  variant?:variantData,
  formerror?:FieldError
}

const ControlledPasswordInput = (props:ControlledPasswordInputOwnProps) => {
  const {
    control, label, variant, name, defaultValue, formerror,
  } = props;
  const [secure, setSecure] = useState(true);
  const inputStyles = useInputsStyles();

  return (
    <Controller
      control={control}
      name={name!}
      render={({
        field: {
          onChange,
        },
      }) => (
        <FormControl variant={variant} className={inputStyles.container}>
          <InputLabel
            htmlFor={name}
            className={inputStyles.unFocusLabel}
            error={!!formerror}
          >
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
                  className={inputStyles.unFocusLabel}
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
            classes={{ root: inputStyles.unFocusStyle, input: inputStyles.removedAutofillStyling }}
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
