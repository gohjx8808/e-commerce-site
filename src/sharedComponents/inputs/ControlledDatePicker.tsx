import { useXsDownMediaQuery } from "@hooks";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

interface ControlledDatePickerOwnProps<T extends FieldValues>
  extends Omit<DatePickerProps<Dayjs>, "renderInput" | "onChange" | "value"> {
  control: Control<T>;
  defaultdate?: PathValue<T, Path<T>>;
  formerror?: FieldError;
  lightBg?: boolean;
  name: Path<T>;
}

const ControlledDatePicker = <T extends FieldValues>(
  props: ControlledDatePickerOwnProps<T>
) => {
  const { control, name, defaultdate, formerror, lightBg, ...rest } = props;

  const isXsView = useXsDownMediaQuery();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <DatePicker
          format={isXsView ? "YYYY-MM-DD" : "DD/MM/YYYY"}
          value={dayjs(value)}
          onChange={(selectedDate) =>
            onChange(selectedDate ? selectedDate?.format("YYYY-MM-DD") : "")
          }
          slotProps={{ textField: { variant: "outlined", fullWidth: true } }}
          disableFuture
          {...rest}
        />
      )}
      defaultValue={defaultdate}
    />
  );
};

ControlledDatePicker.defaultProps = {
  defaultdate: "",
  formerror: null,
  lightBg: false,
};

export default ControlledDatePicker;
