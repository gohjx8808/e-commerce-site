import DatePicker, { DatePickerProps } from '@mui/lab/DatePicker';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import StyledTextField from '../../styledComponents/inputs/StyledTextField';

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
            <StyledTextField
              {...params}
              error={!!formerror}
              lightbg={lightbg}
              helperText={formerror?.message}
            />
          )}
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
  lightbg: 0,
};

export default ControlledDatePicker;
