import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput, { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import clsx from 'clsx';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import useInputsStyles from '../src/useInputsStyles';
import CustomInputErrorIcon from './CustomInputErrorIcon';

interface ControlledTextInputOwnProps extends Omit<OutlinedInputProps, 'defaultValue'>{
  control:Control,
  defaultinput?:string
  formerror?:FieldError
  lightbg?:booleanInteger
  maxLength?:number
  readOnly?:boolean
  infotext?:string
}

const ControlledTextInput = (props:ControlledTextInputOwnProps) => {
  const {
    control,
    label,
    name,
    defaultinput,
    formerror,
    lightbg,
    maxLength,
    readOnly,
    infotext,
    disabled,
  } = props;

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
        <FormControl
          variant="outlined"
          className={inputStyles.container}
          disabled={disabled}
        >
          <InputLabel
            htmlFor={name}
            color={lightbg ? 'secondary' : 'primary'}
            className={clsx(!lightbg && inputStyles.unFocusLabel)}
            error={!!formerror}
          >
            {label}
          </InputLabel>
          <OutlinedInput
            id={name}
            value={value}
            onChange={onChange}
            color={lightbg ? 'secondary' : 'primary'}
            className={clsx(!lightbg && inputStyles.unFocusStyle)}
            error={!!formerror}
            endAdornment={formerror && (
              <InputAdornment position="end">
                <CustomInputErrorIcon />
              </InputAdornment>
            )}
            inputProps={{
              maxLength,
              readOnly,
              className: inputStyles.removedAutofillStyling,
            }}
            {...props}
          />
          <FormHelperText error>{formerror?.message}</FormHelperText>
          <FormHelperText>{infotext}</FormHelperText>
        </FormControl>
      )}
      defaultValue={defaultinput}
    />
  );
};

ControlledTextInput.defaultProps = {
  defaultinput: '',
  formerror: null,
  lightbg: 0,
  maxLength: null,
  readOnly: false,
  infotext: '',
};

export default ControlledTextInput;
