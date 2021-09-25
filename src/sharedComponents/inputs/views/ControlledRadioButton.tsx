import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface ControlledRadioButtonOwnProps extends Omit<RadioGroupProps, 'defaultValue'>{
  control:Control,
  label?:string,
  defaultselect?:string
  error?:FieldError
  options:optionsData[],
}

const useStyles = makeStyles({
  labelRoot: {
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 5,
  },
  spaceBetweenRadio: {
    paddingRight: 20,
  },
});

const ControlledRadioButton = (props:ControlledRadioButtonOwnProps) => {
  const {
    control,
    label,
    name,
    defaultselect,
    error,
    options,
  } = props;

  const styles = useStyles();

  return (
    <Controller
      control={control}
      name={name!}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <>
          <FormControl
            error={!!error}
          >
            <FormLabel component="legend" className={styles.labelRoot} focused={false}>{label}</FormLabel>
            <RadioGroup
              aria-label={label}
              value={value}
              onChange={(_event, radioValue) => onChange(radioValue)}
              {...props}
            >
              {options.map((option) => (
                <FormControlLabel
                  value={option.value}
                  control={<Radio color="secondary" />}
                  label={option.label}
                  className={styles.spaceBetweenRadio}
                  key={option.value}
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
  defaultselect: '',
  label: '',
  error: null,
};

export default ControlledRadioButton;
