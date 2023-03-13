import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
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

interface ControlledCheckboxOwnProps<T extends FieldValues>
  extends Omit<CheckboxProps, "name"> {
  control: Control<T>;
  label: string;
  error?: FieldError;
  name: Path<T>;
}

const ControlledCheckbox = <T extends FieldValues>(
  props: ControlledCheckboxOwnProps<T>
) => {
  const { control, label, name, error } = props;

  return (
    <Controller
      control={control}
      name={name!}
      render={({ field: { onChange, value } }) => (
        <>
          <FormControlLabel
            control={
              <Checkbox
                {...props}
                checked={value}
                onChange={(event) => onChange(event.target.checked)}
              />
            }
            label={label}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </>
      )}
      defaultValue={
        false as UnpackNestedValue<PathValue<T, NonNullable<Path<T>>>>
      }
    />
  );
};

ControlledCheckbox.defaultProps = {
  error: null,
};

export default ControlledCheckbox;
