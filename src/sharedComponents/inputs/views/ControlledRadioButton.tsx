import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface ControlledRadioButtonOwnProps extends RadioGroupProps{
  control:Control,
  label?:string,
  defaultselect?:string
  error?:FieldError
  options:optionsData[],
}

const useStyles = makeStyles({
  labelColor: {
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
            <FormLabel component="legend" className={styles.labelColor} focused={false}>{label}</FormLabel>
            <RadioGroup
              aria-label={label}
              value={value}
              onChange={(_event, radioValue) => onChange(radioValue)}
              {...props}
            >
              {options.map((option) => (
                <FormControlLabel
                  value={option.value}
                  control={<Radio />}
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
