import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

type variantData='standard' | 'filled' | 'outlined'

interface ControlledPickerOwnProps{
  control:Control,
  label?:string,
  variant?:variantData,
  name:string,
  defaultValue?:string
  error?:FieldError
  options:optionsData[]
}

const useStyles = makeStyles({
  unFocusStyle: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'lightgrey',
    },
  },
  unFocusLabel: {
    color: 'white',
  },
  container: {
    width: '80%',
    marginBottom: 5,
  },
});

const ControlledPicker = (props:ControlledPickerOwnProps) => {
  const {
    control, label, variant, name, defaultValue, error, options,
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
        <FormControl variant={variant} className={styles.container}>
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label={label}
                variant={variant}
                InputLabelProps={{ classes: { root: styles.unFocusLabel } }}
              />
            )}
            value={value}
            blurOnSelect
            onChange={(_event: any, newValue:optionsData) => {
              onChange(newValue);
            }}
            autoComplete
            classes={{
              root: styles.unFocusStyle,
              inputRoot: styles.unFocusLabel,
              popupIndicator: styles.unFocusLabel,
              clearIndicator: styles.unFocusLabel,
            }}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </FormControl>
      )}
      defaultValue={defaultValue}
    />
  );
};

ControlledPicker.defaultProps = {
  defaultValue: '',
  variant: undefined,
  label: '',
  error: null,
};

export default ControlledPicker;
