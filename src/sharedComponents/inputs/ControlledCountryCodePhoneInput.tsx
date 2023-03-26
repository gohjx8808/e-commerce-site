import Grid from "@mui/material/Grid";
import {
  Control,
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UnpackNestedValue,
} from "react-hook-form";
import ControlledTextInput, {
  ControlledTextInputProps,
} from "./ControlledTextInput";

interface ControlledCountryCodePhoneInputOwnProps<T extends FieldValues>
  extends ControlledTextInputProps<T> {
  control: Control<T>;
  defaultCountryCode?: UnpackNestedValue<PathValue<T, Path<T>>>;
  defaultPhoneNumber?: UnpackNestedValue<PathValue<T, Path<T>>>;
  countryCodeFormError?: FieldError;
  phoneNumberFormError?: FieldError;
  countryCodeName?: Path<T>;
  phoneNumberName?: Path<T>;
}

const ControlledCountryCodePhoneInput = <T extends FieldValues>(
  props: Omit<ControlledCountryCodePhoneInputOwnProps<T>, "name">
) => {
  const {
    defaultCountryCode,
    defaultPhoneNumber,
    countryCodeFormError,
    phoneNumberFormError,
    countryCodeName,
    phoneNumberName,
    ...rest
  } = props;

  return (
    <Grid item sm={6} xs={12}>
      <Grid container flexDirection="row" columnSpacing={1}>
        <Grid item xs={4}>
          <ControlledTextInput
            name={countryCodeName || ("countryCode" as Path<T>)}
            label="Country Code"
            formerror={countryCodeFormError}
            type="number"
            defaultInput={defaultCountryCode}
            {...rest}
          />
        </Grid>
        <Grid item xs={8}>
          <ControlledTextInput
            name={phoneNumberName || ("phoneNumber" as Path<T>)}
            label="Phone Number"
            formerror={phoneNumberFormError}
            type="tel"
            defaultInput={defaultPhoneNumber}
            {...rest}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

ControlledCountryCodePhoneInput.defaultProps = {
  defaultCountryCode: "60",
  defaultPhoneNumber: "",
  countryCodeFormError: null,
  phoneNumberFormError: null,
  countryCodeName: "",
  phoneNumberName: "",
  lightBg: false,
};

export default ControlledCountryCodePhoneInput;
