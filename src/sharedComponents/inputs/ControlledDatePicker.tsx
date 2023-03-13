import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import React from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UnpackNestedValue,
} from "react-hook-form";
import StyledTextField from "../../styledComponents/inputs/StyledTextField";

interface ControlledDatePickerOwnProps<T extends FieldValues>
  extends Omit<DatePickerProps<Dayjs>, "renderInput" | "onChange" | "value"> {
  control: Control<T>;
  defaultdate?: UnpackNestedValue<PathValue<T, Path<T>>>;
  formerror?: FieldError;
  lightbg?: booleanInteger;
  name: Path<T>;
}

const ControlledDatePicker = <T extends FieldValues>(
  props: ControlledDatePickerOwnProps<T>
) => {
  const { control, name, defaultdate, formerror, lightbg } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <DatePicker
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={(selectedDate) =>
            onChange(selectedDate ? selectedDate?.format("YYYY-MM-DD") : "")
          }
          renderInput={(params) => (
            <StyledTextField
              {...params}
              error={!!formerror}
              lightbg={lightbg}
              helperText={formerror?.message}
              type="date"
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
  defaultdate: "",
  formerror: null,
  lightbg: 0,
};

export default ControlledDatePicker;
