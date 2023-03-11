import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
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

interface ControlledRadioButtonOwnProps<T extends FieldValues>
  extends Omit<RadioGroupProps, "defaultValue" | "name"> {
  control: Control<T>;
  label?: string;
  error?: FieldError;
  options: optionsData[];
  name: Path<T>;
  defaultselect?: UnpackNestedValue<PathValue<T, NonNullable<Path<T>>>>;
}

const ControlledRadioButton = <T extends FieldValues>(
  props: ControlledRadioButtonOwnProps<T>
) => {
  const { control, label, name, defaultselect, error, options } = props;

  return (
    <Controller
      control={control}
      name={name!}
      render={({ field: { onChange, value } }) => (
        <>
          <FormControl error={!!error}>
            <FormLabel
              sx={{
                marginRight: 3,
                paddingBottom: 1,
                paddingTop: 1,
              }}
              component="legend"
              focused={false}
            >
              {label}
            </FormLabel>
            <RadioGroup
              aria-label={label}
              value={value}
              onChange={(_event, radioValue) => onChange(radioValue)}
              {...props}
            >
              {options.map((option) => (
                <FormControlLabel
                  value={option.id}
                  control={<Radio color="secondary" />}
                  label={option.name}
                  sx={{ paddingRight: 3 }}
                  key={String(option.id)}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <FormHelperText error>{error?.message}</FormHelperText>
        </>
      )}
      defaultValue={defaultselect}
    />
  );
};

ControlledRadioButton.defaultProps = {
  defaultselect: "",
  label: "",
  error: null,
};

export default ControlledRadioButton;
