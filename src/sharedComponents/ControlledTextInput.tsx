import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput, { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

type variantData='standard' | 'filled' | 'outlined'

interface ControlledTextInputOwnProps extends OutlinedInputProps{
  control:Control,
  label?:string,
  variant?:variantData,
  name:string,
  defaultinput?:string
  formerror?:FieldError
  customclassname?:string
  lightbg?:booleanInteger
  maxLength?:number
  readOnly?:boolean
  infotext?:string
  disabled?:boolean
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
  formControl: {
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

const ControlledTextInput = (props:ControlledTextInputOwnProps) => {
  const {
    control,
    label,
    type,
    variant,
    name,
    defaultinput,
    formerror,
    customclassname,
    lightbg,
    maxLength,
    readOnly,
    infotext,
    disabled,
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
          className={`${styles.formControl} ${customclassname}`}
          style={{
            display: type === 'hidden' ? 'none' : 'flex',
          }}
          disabled={disabled}
        >
          <InputLabel
            htmlFor={name}
            color={lightbg ? 'secondary' : 'primary'}
            classes={{ root: !lightbg ? styles.unFocusLabel : '' }}
            error={!!formerror}
          >
            {label}
          </InputLabel>
          <OutlinedInput
            id={name}
            value={value}
            onChange={onChange}
            color={lightbg ? 'secondary' : 'primary'}
            classes={{ root: !lightbg ? styles.unFocusStyle : '', input: styles.removedAutofillStyling }}
            error={!!formerror}
            endAdornment={formerror && (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                >
                  <CancelIcon color="error" />
                </IconButton>
              </InputAdornment>
            )}
            inputProps={{
              maxLength,
              readOnly,
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
  variant: undefined,
  label: '',
  formerror: null,
  customclassname: '',
  lightbg: 0,
  maxLength: null,
  readOnly: false,
  infotext: '',
  disabled: false,
};

export default ControlledTextInput;
