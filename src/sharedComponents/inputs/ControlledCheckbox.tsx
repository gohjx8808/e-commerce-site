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

interface ControlledCheckboxOwnProps<T> extends Omit<CheckboxProps, "name"> {
  control: Control<T>;
  label: string;
  error?: FieldError;
  name: Path<T>;
  defaultcheck?: UnpackNestedValue<PathValue<T, NonNullable<Path<T>>>>;
}

const ControlledCheckbox = <T extends FieldValues>(
  props: ControlledCheckboxOwnProps<T>
) => {
  const { control, label, defaultcheck, name, error } = props;

  return (
    <Controller
      control={control}
      name={name!}
      render={({ field: { onChange } }) => (
        <>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) => onChange(event.target.checked)}
                {...props}
              />
            }
            label={label}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </>
      )}
      defaultValue={defaultcheck}
    />
  );
};

ControlledCheckbox.defaultProps = {
  error: null,
  defaultcheck: false,
};

export default ControlledCheckbox;
