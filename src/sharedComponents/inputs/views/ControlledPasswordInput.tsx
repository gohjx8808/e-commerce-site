import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import React, { useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useInputsStyles from '../src/useInputsStyles';
import CustomInputErrorIcon from './CustomInputErrorIcon';

interface ControlledPasswordInputOwnProps extends OutlinedInputProps{
  control:Control,
  formerror?:FieldError
}

const ControlledPasswordInput = (props:ControlledPasswordInputOwnProps) => {
  const {
    control, label, name, formerror,
  } = props;
  const [secure, setSecure] = useState(true);
  const inputStyles = useInputsStyles();

  return (
    <Controller
      control={control}
      name={name!}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <FormControl variant="outlined" className={inputStyles.container}>
          <InputLabel
            htmlFor={name}
            className={inputStyles.unFocusLabel}
            error={!!formerror}
          >
            {label}
          </InputLabel>
          <OutlinedInput
            value={value}
            id={name}
            type={!secure ? 'text' : 'password'}
            onChange={onChange}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setSecure(!secure)}
                  edge="start"
                  className={inputStyles.whiteIcon}
                >
                  {!secure
                    ? <VisibilityIcon color={formerror ? 'error' : 'inherit'} />
                    : <VisibilityOffIcon color={formerror ? 'error' : 'inherit'} />}
                </IconButton>
                {formerror
                && (
                  <CustomInputErrorIcon />
                )}
              </InputAdornment>
            )}
            inputProps={{ className: inputStyles.removedAutofillStyling }}
            className={inputStyles.unFocusStyle}
            error={!!formerror}
            {...props}
          />
          <FormHelperText error>{formerror?.message}</FormHelperText>
        </FormControl>
      )}
      defaultValue=""
    />
  );
};

ControlledPasswordInput.defaultProps = {
  formerror: null,
};

export default ControlledPasswordInput;
