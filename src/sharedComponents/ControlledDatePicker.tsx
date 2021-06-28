import LuxonUtils from '@date-io/luxon';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker } from '@material-ui/pickers/DatePicker';
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

type variantData='standard' | 'filled' | 'outlined'

interface ControlledDatePickerOwnProps{
  control:Control,
  label?:string,
  variant?:variantData,
  name:string,
  defaultValue?:string
  error?:FieldError
}

const useStyles = makeStyles((theme) => ({
  unFocusStyle: {
    color: 'white',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'lightgrey',
    },
    marginTop: 0,
  },
  unFocusLabel: {
    color: 'white',
  },
  container: {
    width: '80%',
    marginTop: 5,
    marginBottom: 5,
  },
  errorColor: {
    color: theme.palette.error.main,
  },
}));

const ControlledDatePicker = (props:ControlledDatePickerOwnProps) => {
  const {
    control, label, variant, name, defaultValue, error,
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
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <KeyboardDatePicker
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              label={label}
              value={value ? new Date(value) : null}
              onChange={(selectedDate:Date) => onChange(selectedDate ? selectedDate.toString() : '')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
                className: error ? styles.errorColor : styles.unFocusLabel,
              }}
              inputVariant={variant}
              className={styles.unFocusStyle}
              InputLabelProps={{ classes: { root: styles.unFocusLabel } }}
              InputProps={{ classes: { root: styles.unFocusLabel } }}
              disableFuture
              maxDateMessage="Invalid date"
              minDateMessage="Invalid date"
              autoOk
              error={!!error}
              helperText={error?.message}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
      )}
      defaultValue={defaultValue}
    />
  );
};

ControlledDatePicker.defaultProps = {
  defaultValue: '',
  variant: undefined,
  label: '',
  error: null,
};

export default ControlledDatePicker;
