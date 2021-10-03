import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import ToggleButtonGroup, { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import StyledToggleButton from '../../styledComponents/inputs/StyledToggleButton';

interface ControlledToggleButtonOwnProps extends ToggleButtonGroupProps{
  control:Control
  error?:FieldError
  options:toggleButtonOptionData[]
  name:string
  label:string
}

const ControlledToggleButton = (props:ControlledToggleButtonOwnProps) => {
  const {
    control, error, options, name, label,
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <FormLabel component="legend" focused={false} sx={{ marginY: 1 }}>{label}</FormLabel>
          <ToggleButtonGroup
            value={value}
            exclusive
            onChange={(_event: React.MouseEvent<HTMLElement>, newValue: string) => {
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
      defaultValue=""
    />
  );
};

ControlledToggleButton.defaultProps = {
  error: null,
};

export default ControlledToggleButton;
