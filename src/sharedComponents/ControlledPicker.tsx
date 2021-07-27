import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

type variantData='standard' | 'filled' | 'outlined'

interface ControlledPickerOwnProps{
  control:Control,
  label?:string,
  variant?:variantData,
  name:string,
  defaultValue?:string
  error?:FieldError
  options:optionsData[]
  lightBg?:boolean
  customClassName?:string
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
    width: '80%',
    marginBottom: 5,
    marginTop: 5,
  },
  errorColor: {
    color: theme.palette.error.main,
  },
}));

const ControlledPicker = (props:ControlledPickerOwnProps) => {
  const {
    control, label, variant, name, defaultValue, error, options, lightBg, customClassName,
  } = props;

  const [popupIndicatorClass, setPopupIndicatorClass] = useState('');

  const styles = useStyles();

  useEffect(() => {
    if (error) {
      setPopupIndicatorClass(styles.errorColor);
    } else if (lightBg) {
      setPopupIndicatorClass('');
    } else {
      setPopupIndicatorClass(styles.unFocusLabel);
    }
  }, [error, lightBg, styles]);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <FormControl variant={variant} className={`${styles.container} ${customClassName}`}>
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label}
            getOptionSelected={(option, selectedValue) => option.value === selectedValue.value}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label={label}
                variant={variant}
                InputLabelProps={{
                  classes: { root: lightBg ? '' : styles.unFocusLabel },
                }}
                error={!!error}
                color={lightBg ? 'secondary' : 'primary'}
              />
            )}
            value={value}
            blurOnSelect
            onChange={(_event: any, newValue:optionsData) => {
              onChange(newValue);
            }}
            autoComplete
            classes={{
              root: !lightBg ? styles.unFocusStyle : '',
              inputRoot: !lightBg ? styles.unFocusLabel : '',
              popupIndicator: popupIndicatorClass,
              clearIndicator: lightBg ? '' : styles.unFocusLabel,
            }}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </FormControl>
      )}
      defaultValue={defaultValue}
    />
  );
};

ControlledPicker.defaultProps = {
  defaultValue: null,
  variant: undefined,
  label: '',
  error: null,
  lightBg: false,
  customClassName: '',
};

export default ControlledPicker;
