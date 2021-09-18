import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import clsx from 'clsx';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import useInputsStyles from '../src/useInputsStyles';

interface ControlledPickerOwnProps extends Omit<AutocompleteProps<optionsData, boolean, boolean, boolean>, 'renderInput'>{
  control:Control,
  label:string,
  name:string,
  error?:FieldError
  lightbg?:booleanInteger
}

const ControlledPicker = (props:ControlledPickerOwnProps) => {
  const {
    control,
    label,
    name,
    defaultValue,
    error,
    lightbg,
  } = props;

  const inputStyles = useInputsStyles();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <FormControl variant="outlined" className={inputStyles.container}>
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
                variant="outlined"
                InputLabelProps={{
                  className: clsx(!lightbg && inputStyles.unFocusLabel),
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
              root: clsx(!lightbg && inputStyles.unFocusStyle),
              inputRoot: clsx(!lightbg && inputStyles.unFocusLabel),
              input: inputStyles.removedAutofillStyling,
              popupIndicator: clsx(
                !lightbg && inputStyles.unFocusLabel, error && inputStyles.errorColor,
              ),
              clearIndicator: clsx(!lightbg && inputStyles.unFocusLabel),
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
  error: null,
  lightbg: 0,
};

export default ControlledPicker;
