import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import useInputsStyles from '../src/useInputsStyles';

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
  errorColor: {
    color: theme.palette.error.main,
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
  const inputStyles = useInputsStyles();

  useEffect(() => {
    if (error) {
      setPopupIndicatorClass(styles.errorColor);
    } else if (lightbg) {
      setPopupIndicatorClass('');
    } else {
      setPopupIndicatorClass(inputStyles.unFocusLabel);
    }
  }, [error, lightbg, styles, inputStyles]);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <FormControl variant={variant} className={`${inputStyles.container} ${customclassname}`}>
          <Autocomplete
            value={value}
            getOptionLabel={(option) => option.label}
            getOptionSelected={
              (option, selectedValue) => selectedValue && option.value === selectedValue.value
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant={variant}
                InputLabelProps={{
                  classes: { root: lightbg ? '' : inputStyles.unFocusLabel },
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
              root: !lightbg ? inputStyles.unFocusStyle : '',
              inputRoot: !lightbg ? inputStyles.unFocusLabel : '',
              input: inputStyles.removedAutofillStyling,
              popupIndicator: popupIndicatorClass,
              clearIndicator: lightbg ? '' : inputStyles.unFocusLabel,
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
