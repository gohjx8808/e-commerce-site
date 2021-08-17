import LuxonUtils from '@date-io/luxon';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker } from '@material-ui/pickers/DatePicker';
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

type variantData='standard' | 'filled' | 'outlined'

interface ControlledDatePickerOwnProps{
  control:Control,
  label?:string,
  variant?:variantData,
  name:string,
  defaultValue?:string
  error?:FieldError
  lightBg?:boolean
  customClassName?:string
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
  },
  unFocusLabel: {
    color: 'white',
  },
  container: {
    width: '100%',
  },
  errorColor: {
    color: theme.palette.error.main,
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
  black: {
    color: 'black',
  },
}));

const ControlledDatePicker = (props:ControlledDatePickerOwnProps) => {
  const {
    control, label, variant, name, defaultValue, error, lightBg, customClassName,
  } = props;
  const [inputColorClass, setInputColorClass] = useState('');
  const styles = useStyles();

  useEffect(() => {
    if (error) {
      setInputColorClass(styles.errorColor);
    } else if (lightBg) {
      setInputColorClass(styles.black);
    } else {
      setInputColorClass(styles.unFocusLabel);
    }
  }, [error, lightBg, styles]);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <KeyboardDatePicker
            format="dd/MM/yyyy"
            label={label}
            value={value ? new Date(value) : null}
            onChange={(selectedDate:MaterialUiPickersDate) => onChange(selectedDate ? selectedDate.toString() : '')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
              className: inputColorClass,
            }}
            color={lightBg ? 'secondary' : 'primary'}
            inputVariant={variant}
            className={clsx(styles.container, customClassName, !lightBg && styles.unFocusStyle)}
            InputLabelProps={{ classes: { root: !lightBg ? styles.unFocusLabel : '' } }}
            InputProps={{ classes: { root: !lightBg ? styles.unFocusLabel : '' } }}
            disableFuture
            maxDateMessage="Invalid date"
            minDateMessage="Invalid date"
            autoOk
            error={!!error}
            helperText={error?.message}
          />
        </MuiPickersUtilsProvider>
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
  lightBg: false,
  customClassName: '',
};

export default ControlledDatePicker;
