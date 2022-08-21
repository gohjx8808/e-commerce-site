import { InputProps } from "@mui/material";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import React from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UnpackNestedValue,
} from "react-hook-form";
import StyledAutocompleteFormControl from "../../styledComponents/inputs/StyledAutocompleteFormControl";

interface ControlledPickerOwnProps<T extends FieldValues>
  extends Omit<
    AutocompleteProps<optionsData, boolean, boolean, boolean>,
    "renderInput"
  > {
  control: Control<T>;
  label: string;
  name: Path<T>;
  error?: FieldError;
  lightbg?: booleanInteger;
  defaultcheck?: UnpackNestedValue<PathValue<T, Path<T>>>;
  adornment?: boolean;
  customInputProps?: InputProps;
}

const ControlledPicker = <T extends FieldValues>(
  props: ControlledPickerOwnProps<T>
) => {
  const {
    control,
    label,
    name,
    defaultcheck,
    error,
    lightbg,
    options,
    adornment,
    customInputProps,
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <StyledAutocompleteFormControl lightbg={lightbg}>
          <Autocomplete
            {...props}
            value={value}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant={adornment ? "standard" : "outlined"}
                error={!!error}
                InputProps={{ ...params.InputProps, ...customInputProps }}
              />
            )}
            blurOnSelect
            onChange={(_event, newValue) => {
              onChange(newValue);
            }}
            autoComplete
            isOptionEqualToValue={(option, selectedValue) =>
              option.value === selectedValue.value
            }
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </StyledAutocompleteFormControl>
      )}
      defaultValue={
        (options.find((option) => option.value === defaultcheck) ||
          null) as UnpackNestedValue<PathValue<T, Path<T>>>
      }
    />
  );
};

ControlledPicker.defaultProps = {
  error: null,
  lightbg: 0,
  defaultcheck: null,
  adornment: false,
  customInputProps: {},
};

export default ControlledPicker;
