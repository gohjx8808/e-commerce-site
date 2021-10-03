import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import StyledAutocompleteFormControl from '../../styledComponents/inputs/StyledAutocompleteFormControl';

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

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <StyledAutocompleteFormControl lightbg={lightbg}>
          <Autocomplete
            value={value}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="outlined"
                error={!!error}
              />
            )}
            blurOnSelect
            onChange={(_event, newValue) => {
              onChange(newValue);
            }}
            autoComplete
            {...props}
          />
          <FormHelperText error>
            {error?.message}
          </FormHelperText>
        </StyledAutocompleteFormControl>
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
