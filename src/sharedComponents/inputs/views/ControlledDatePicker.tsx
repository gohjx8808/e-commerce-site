import DatePicker, { DatePickerProps } from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import useGlobalStyles from '../../../useGlobalStyles';
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
  const globalStyles = useGlobalStyles();

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
                !lightbg && inputStyles.calendarWhite,
                formerror && inputStyles.calendarError,
              )}
              InputLabelProps={{ className: inputStyles.unFocusLabel }}
              error={!!formerror}
              color={lightbg ? 'secondary' : 'primary'}
              helperText={formerror?.message}
            />
          )}
          InputProps={{ className: globalStyles.white }}
          disableFuture
          {...props}
        />
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
