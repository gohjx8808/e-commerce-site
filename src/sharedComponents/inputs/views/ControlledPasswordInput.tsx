import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import React, { useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import StyledFormControl from '../../../styledComponents/inputs/StyledFormControl';
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

  return (
    <Controller
      control={control}
      name={name!}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <StyledFormControl>
          <InputLabel
            htmlFor={name}
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
                >
                  {!secure
                    ? <VisibilityIcon />
                    : <VisibilityOffIcon />}
                </IconButton>
                {formerror
                && (
                  <CustomInputErrorIcon />
                )}
              </InputAdornment>
            )}
            error={!!formerror}
            {...props}
          />
          <FormHelperText error>{formerror?.message}</FormHelperText>
        </StyledFormControl>
      )}
      defaultValue=""
    />
  );
};

ControlledPasswordInput.defaultProps = {
  formerror: null,
};

export default ControlledPasswordInput;
