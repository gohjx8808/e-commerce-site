import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import StyledAutocompleteFormControl from "../../styledComponents/inputs/StyledAutocompleteFormControl";

export interface ControlledPickerProps<T extends FieldValues>
  extends Omit<
    AutocompleteProps<numberOptionsData|stringOptionsData, boolean, boolean, boolean>,
    "renderInput"
  > {
  control: Control<T>;
  label: string;
  name: Path<T>;
  error?: FieldError;
  lightBg?: boolean;
  defaultCheck?: PathValue<T, Path<T>>;
}

const ControlledPicker = <T extends FieldValues>(
  props: ControlledPickerProps<T>
) => {
  const { control, label, name, defaultCheck, error, lightBg, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <StyledAutocompleteFormControl lightBg={lightBg}>
          <Autocomplete
            {...rest}
            value={value}
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
            isOptionEqualToValue={(option, selectedValue) =>
              option.id === selectedValue.id
            }
            getOptionLabel={(option) =>
              typeof option !== "string" ? option.name : option
            }
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </StyledAutocompleteFormControl>
      )}
      defaultValue={defaultCheck}
    />
  );
};

ControlledPicker.defaultProps = {
  error: null,
  lightBg: false,
  defaultCheck: null,
};

export default ControlledPicker;
