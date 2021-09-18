import DayjsUtils from '@date-io/dayjs';
import { DatePickerProps, KeyboardDatePicker } from '@material-ui/pickers/DatePicker';
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import clsx from 'clsx';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import useInputsStyles from '../src/useInputsStyles';

interface ControlledDatePickerOwnProps extends Omit<DatePickerProps, 'value'|'onChange'>{
  control:Control,
  defaultdate?:string
  formerror?:FieldError
  lightbg?:booleanInteger
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
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <KeyboardDatePicker
            format="DD/MM/YYYY"
            value={value ? new Date(value) : null}
            onChange={(selectedDate:MaterialUiPickersDate) => onChange(selectedDate ? selectedDate.toString() : '')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
              color: 'inherit',
              className: clsx(formerror && inputStyles.errorColor),
            }}
            color={lightbg ? 'secondary' : 'primary'}
            className={inputStyles.container}
            InputLabelProps={{ className: clsx(!lightbg && inputStyles.unFocusLabel) }}
            InputProps={{
              className: clsx(
                !lightbg && inputStyles.unFocusStyle, inputStyles.removedAutofillStyling,
              ),
            }}
            disableFuture
            maxDateMessage="Invalid date"
            minDateMessage="Invalid date"
            autoOk
            error={!!formerror}
            helperText={formerror?.message}
            {...props}
          />
        </MuiPickersUtilsProvider>
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
