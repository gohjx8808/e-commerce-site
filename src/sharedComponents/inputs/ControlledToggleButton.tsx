import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import React from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import StyledToggleButton from "../../styledComponents/inputs/StyledToggleButton";

interface ControlledToggleButtonOwnProps<T extends FieldValues>
  extends ToggleButtonGroupProps {
  control: Control<T>;
  error?: FieldError;
  options: toggleButtonOptionData[];
  label: string;
  name: Path<T>;
}

const ControlledToggleButton = <T extends FieldValues>(
  props: ControlledToggleButtonOwnProps<T>
) => {
  const { control, error, options, name, label } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <FormLabel component="legend" focused={false} sx={{ marginY: 1 }}>
            {label}
          </FormLabel>
          <ToggleButtonGroup
            value={value}
            exclusive
            onChange={(
              _event: React.MouseEvent<HTMLElement>,
              newValue: string
            ) => {
              onChange(newValue);
            }}
            aria-label={name}
            {...props}
          >
            {options.map((option) => (
              <StyledToggleButton
                bgcolor={option.activeColor}
                key={option.value}
                value={option.value}
                aria-label={option.label}
              >
                {option.icon}
                <Typography>{option.label}</Typography>
              </StyledToggleButton>
            ))}
          </ToggleButtonGroup>
          <FormHelperText error>{error?.message}</FormHelperText>
        </>
      )}
    />
  );
};

ControlledToggleButton.defaultProps = {
  error: null,
};

export default ControlledToggleButton;
