import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { capitalize } from "@mui/material/utils";
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
import StyledFormControl from "../../styledComponents/inputs/StyledFormControl";
import CustomInputErrorIcon from "./CustomInputErrorIcon";

interface ControlledTextInputOwnProps<T extends FieldValues>
  extends Omit<OutlinedInputProps, "defaultValue" | "name"> {
  control: Control<T>;
  defaultinput?: UnpackNestedValue<PathValue<T, Path<T>>>;
  formerror?: FieldError;
  lightbg?: booleanInteger;
  maxLength?: number;
  readOnly?: boolean;
  infotext?: string;
  name: Path<T>;
  isCapitalize?: boolean;
}

const ControlledTextInput = <T extends FieldValues>(
  props: ControlledTextInputOwnProps<T>
) => {
  const {
    control,
    label,
    name,
    defaultinput,
    formerror,
    lightbg,
    maxLength,
    readOnly,
    infotext,
    disabled,
    isCapitalize,
  } = props;

  return (
    <Controller
      control={control}
      name={name!}
      render={({ field: { onChange, value } }) => (
        <StyledFormControl disabled={disabled} lightbg={lightbg}>
          <InputLabel htmlFor={name} error={!!formerror}>
            {label}
          </InputLabel>
          <OutlinedInput
            id={name}
            value={value}
            onChange={(event) =>
              onChange(
                isCapitalize
                  ? capitalize(event.target.value)
                  : event.target.value
              )
            }
            error={!!formerror}
            endAdornment={
              formerror && (
                <InputAdornment position="end">
                  <CustomInputErrorIcon />
                </InputAdornment>
              )
            }
            inputProps={{
              maxLength,
              readOnly,
              style: { textTransform: isCapitalize ? "capitalize" : "none" },
            }}
            {...props}
          />
          <FormHelperText error>{formerror?.message}</FormHelperText>
          <FormHelperText>{infotext}</FormHelperText>
        </StyledFormControl>
      )}
      defaultValue={defaultinput}
    />
  );
};

ControlledTextInput.defaultProps = {
  defaultinput: "",
  formerror: null,
  lightbg: 0,
  maxLength: null,
  readOnly: false,
  infotext: "",
  isCapitalize: true,
};

export default ControlledTextInput;
