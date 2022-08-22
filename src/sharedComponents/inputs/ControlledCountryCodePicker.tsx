import { Box } from "@mui/material";
import { Popper } from "@mui/material";
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

interface ControlledCountryCodePickerOwnProps<T extends FieldValues>
  extends Omit<
    AutocompleteProps<account.countryCodeData, boolean, boolean, boolean>,
    "renderInput"
  > {
  control: Control<T>;
  name: Path<T>;
  error?: FieldError;
  lightbg?: booleanInteger;
}

const ControlledCountryCodePicker = <T extends FieldValues>(
  props: ControlledCountryCodePickerOwnProps<T>
) => {
  const { control, name, error, lightbg } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <StyledAutocompleteFormControl lightbg={lightbg}>
          <Autocomplete
            {...props}
            disableClearable
            blurOnSelect
            autoHighlight
            value={value}
            defaultValue=""
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                error={!!error}
                InputProps={{ ...params.InputProps, disableUnderline: true }}
              />
            )}
            onChange={(_event, newValue) => {
              onChange(newValue);
            }}
            isOptionEqualToValue={(option, selectedValue) =>
              option.id === selectedValue.id
            }
            renderOption={(optionProps, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                {`${option.countryCode} (${option.name})`}
              </Box>
            )}
            getOptionLabel={(option) => {
              if (typeof option !== "string") {
                return `${option.countryCode} (${option.iso2})`;
              }
              return "";
            }}
            PopperComponent={(popperProps) => (
              <Popper {...popperProps} style={{ width: "fit-content" }} />
            )}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </StyledAutocompleteFormControl>
      )}
      defaultValue={{id: 127, iso2: 'MY', countryCode: '+60', name: 'Malaysia'}as UnpackNestedValue<PathValue<T, Path<T>>>}
    />
  );
};

ControlledCountryCodePicker.defaultProps = {
  error: null,
  lightbg: 0,
};

export default ControlledCountryCodePicker;
