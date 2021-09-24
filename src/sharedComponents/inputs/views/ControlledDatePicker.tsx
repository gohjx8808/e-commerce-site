import DatePicker, { DatePickerProps } from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import useInputsStyles from '../src/useInputsStyles';

interface ControlledDatePickerOwnProps extends Omit<DatePickerProps<Date>, 'renderInput'|'onChange'|'value'>{
  control:Control,
  defaultdate?:string
  formerror?:FieldError
  lightbg?:booleanInteger
  name:string
}

const ControlledDatePicker = (props:ControlledDatePickerOwnProps) => {
  const {
    control, name, defaultdate, formerror, lightbg,
  } = props;
  const inputStyles = useInputsStyles();

  return (
    <Controller
      control={control}
      name={name!}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <DatePicker
          inputFormat="DD/MM/YYYY"
          value={value ? new Date(value) : null}
          onChange={(selectedDate) => onChange(selectedDate ? selectedDate.toString() : '')}
          renderInput={(params) => (
            <TextField
              {...params}
              className={clsx(
                inputStyles.container,
                !lightbg && inputStyles.unFocusStyle,
                inputStyles.removedAutofillStyling,
              )}
              error={!!formerror}
              color={lightbg ? 'secondary' : 'primary'}
            />
          )}
          disableFuture
          {...props}
        />
        // <KeyboardDatePicker
        //   format="DD/MM/YYYY"
        //   value={value ? new Date(value) : null}
        //   onChange={(selectedDate:MaterialUiPickersDate) => onChange(selectedDate ? selectedDate.toString() : '')}
        //   KeyboardButtonProps={{
        //     'aria-label': 'change date',
        //     color: 'inherit',
        //     className: clsx(formerror && inputStyles.errorColor),
        //   }}
        //   color={lightbg ? 'secondary' : 'primary'}
        //   className={inputStyles.container}
        //   InputLabelProps={{ className: clsx(!lightbg && inputStyles.unFocusLabel) }}
        //   InputProps={{
        //     className: clsx(
        //       !lightbg && inputStyles.unFocusStyle, inputStyles.removedAutofillStyling,
        //     ),
        //   }}
        //   disableFuture
        //   maxDateMessage="Invalid date"
        //   minDateMessage="Invalid date"
        //   autoOk
        //   error={!!formerror}
        //   helperText={formerror?.message}
        //   {...props}
        // />
      )}
      defaultValue={defaultdate}
    />
  );
};

ControlledDatePicker.defaultProps = {
  defaultdate: '',
  formerror: null,
  lightbg: undefined,
};

export default ControlledDatePicker;
