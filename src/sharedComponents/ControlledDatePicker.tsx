import DayjsUtils from '@date-io/dayjs';
import { makeStyles } from '@material-ui/core/styles';
import { DatePickerProps, KeyboardDatePicker } from '@material-ui/pickers/DatePicker';
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface ControlledDatePickerOwnProps extends Omit<DatePickerProps, 'value'|'onChange'>{
  control:Control,
  name:string,
  defaultValue?:string
  formError?:FieldError
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
  removedAutofillStyling: {
    '&:-webkit-autofill': {
      transitionDelay: '9999s',
    },
    '&:-webkit-autofill::first-line': {
      fontFamily: 'Sitka Display Semibold',
      fontSize: '1rem',
    },
  },
}));

const ControlledDatePicker = (props:ControlledDatePickerOwnProps) => {
  const {
    control, name, defaultValue, formError, lightBg, customClassName,
  } = props;
  const [inputColorClass, setInputColorClass] = useState('');
  const styles = useStyles();

  useEffect(() => {
    if (formError) {
      setInputColorClass(styles.errorColor);
    } else if (lightBg) {
      setInputColorClass(styles.black);
    } else {
      setInputColorClass(styles.unFocusLabel);
    }
  }, [formError, lightBg, styles]);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <KeyboardDatePicker
            format="DD/MM/YYYY"
            value={value ? new Date(value) : null}
            onChange={(selectedDate:MaterialUiPickersDate) => onChange(selectedDate ? selectedDate.toString() : '')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
              className: inputColorClass,
            }}
            color={lightBg ? 'secondary' : 'primary'}
            className={clsx(styles.container, customClassName, !lightBg && styles.unFocusStyle)}
            InputLabelProps={{ classes: { root: !lightBg ? styles.unFocusLabel : '' } }}
            InputProps={{ classes: { root: !lightBg ? styles.unFocusLabel : '', input: styles.removedAutofillStyling } }}
            disableFuture
            maxDateMessage="Invalid date"
            minDateMessage="Invalid date"
            autoOk
            error={!!formError}
            helperText={formError?.message}
            {...props}
          />
        </MuiPickersUtilsProvider>
      )}
      defaultValue={defaultValue}
    />
  );
};

ControlledDatePicker.defaultProps = {
  defaultValue: '',
  formError: null,
  lightBg: false,
  customClassName: '',
};

export default ControlledDatePicker;
