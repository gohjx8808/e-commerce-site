import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

type variantData='standard' | 'filled' | 'outlined'

interface ControlledPickerOwnProps extends Omit<AutocompleteProps<optionsData, boolean, boolean, boolean>, 'renderInput'>{
  control:Control,
  label?:string,
  variant?:variantData,
  name:string,
  error?:FieldError
  lightbg?:booleanInteger
  customclassname?:string
}

const useStyles = makeStyles((theme) => ({
  unFocusStyle: {
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
  errorColor: {
    color: theme.palette.error.main,
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
}));

const ControlledPicker = (props:ControlledPickerOwnProps) => {
  const {
    control,
    label,
    variant,
    name,
    defaultValue,
    error,
    lightbg,
    customclassname,
  } = props;

  const [popupIndicatorClass, setPopupIndicatorClass] = useState('');

  const styles = useStyles();

  useEffect(() => {
    if (error) {
      setPopupIndicatorClass(styles.errorColor);
    } else if (lightbg) {
      setPopupIndicatorClass('');
    } else {
      setPopupIndicatorClass(styles.unFocusLabel);
    }
  }, [error, lightbg, styles]);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <FormControl variant={variant} className={`${styles.container} ${customclassname}`}>
          <Autocomplete
            value={value}
            getOptionLabel={(option) => option.label}
            getOptionSelected={
              (option, selectedValue) => selectedValue && option.value === selectedValue.value
            }
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label={label}
                variant={variant}
                InputLabelProps={{
                  classes: { root: lightbg ? '' : styles.unFocusLabel },
                }}
                error={!!error}
                color={lightbg ? 'secondary' : 'primary'}
              />
            )}
            blurOnSelect
            onChange={(_event, newValue) => {
              onChange(newValue);
            }}
            autoComplete
            classes={{
              root: !lightbg ? styles.unFocusStyle : '',
              inputRoot: !lightbg ? styles.unFocusLabel : '',
              input: styles.removedAutofillStyling,
              popupIndicator: popupIndicatorClass,
              clearIndicator: lightbg ? '' : styles.unFocusLabel,
            }}
            {...props}
          />
          <FormHelperText error>
            {error?.message}
          </FormHelperText>
        </FormControl>
      )}
      defaultValue={defaultValue}
    />
  );
};

ControlledPicker.defaultProps = {
  variant: undefined,
  label: '',
  error: null,
  lightbg: 0,
  customclassname: '',
};

export default ControlledPicker;
