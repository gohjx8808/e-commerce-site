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

export interface ControlledTextInputProps<T extends FieldValues>
  extends Omit<OutlinedInputProps, "defaultValue" | "name"> {
  control: Control<T>;
  defaultInput?: UnpackNestedValue<PathValue<T, Path<T>>>;
  formerror?: FieldError;
  lightBg?: boolean;
  maxLength?: number;
  readOnly?: boolean;
  infotext?: string;
  name: Path<T>;
  isCapitalize?: boolean;
}

const ControlledTextInput = <T extends FieldValues>(
  props: ControlledTextInputProps<T>
) => {
  const {
    control,
    label,
    name,
    defaultInput,
    formerror,
    lightBg,
    maxLength,
    readOnly,
    infotext,
    disabled,
    isCapitalize,
    ...rest
  } = props;

  return (
    <Controller
      control={control}
      name={name!}
      render={({ field: { onChange, value } }) => (
        <StyledFormControl disabled={disabled} lightBg={lightBg}>
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
            {...rest}
          />
          <FormHelperText error>{formerror?.message}</FormHelperText>
          <FormHelperText>{infotext}</FormHelperText>
        </StyledFormControl>
      )}
      defaultValue={defaultInput}
    />
  );
};

ControlledTextInput.defaultProps = {
  defaultInput: "",
  formerror: null,
  lightBg: false,
  maxLength: null,
  readOnly: false,
  infotext: "",
  isCapitalize: true,
};

export default ControlledTextInput;
