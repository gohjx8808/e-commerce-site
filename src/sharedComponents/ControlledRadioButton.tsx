import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface ControlledRadioButtonOwnProps{
  control:Control,
  label?:string,
  name:string,
  defaultValue?:string
  error?:FieldError
  options:optionsData[],
  flexDirection?:string
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
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colFlex: {
    flexDirection: 'column',
  },
});

const ControlledRadioButton = (props:ControlledRadioButtonOwnProps) => {
  const {
    control,
    label,
    name,
    defaultValue,
    error,
    options,
    flexDirection,
  } = props;

  const styles = useStyles();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <>
          <FormControl
            className={clsx({ [styles.rowFlex]: flexDirection === 'row', [styles.colFlex]: flexDirection === 'column' })}
            error={!!error}
          >
            <FormLabel component="legend" className={styles.labelColor} focused={false}>{label}</FormLabel>
            <RadioGroup
              aria-label={label}
              value={value}
              onChange={(_event, radioValue) => onChange(radioValue)}
              row
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
      defaultValue={defaultValue}
    />
  );
};

ControlledRadioButton.defaultProps = {
  defaultValue: '',
  label: '',
  error: null,
  flexDirection: 'row',
};

export default ControlledRadioButton;
