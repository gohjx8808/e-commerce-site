import { makeStyles } from '@mui/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';
import clsx from 'clsx';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';

interface ControlledToggleButtonOwnProps extends ToggleButtonGroupProps{
  control:Control
  error?:FieldError
  options:toggleButtonOptionData[]
  name:string
  label:string
}

const useStyles = makeStyles({
  orangeBg: {
    backgroundColor: 'orange!important',
  },
  blueBg: {
    backgroundColor: 'lightblue!important',
  },
  label: {
    paddingBottom: 10,
    paddingTop: 5,
  },
});

const ControlledToggleButton = (props:ControlledToggleButtonOwnProps) => {
  const styles = useStyles();
  const {
    control, error, options, name, label,
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <FormLabel component="legend" focused={false} className={styles.label}>{label}</FormLabel>
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
              <ToggleButton
                key={option.value}
                classes={{
                  selected: clsx({
                    [styles.blueBg]: option.activeColor === 'blue',
                    [styles.orangeBg]: option.activeColor === 'orange',
                  }),
                }}
                value={option.value}
                aria-label={option.label}
              >
                {option.icon}
                <Typography>{option.label}</Typography>
              </ToggleButton>
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
