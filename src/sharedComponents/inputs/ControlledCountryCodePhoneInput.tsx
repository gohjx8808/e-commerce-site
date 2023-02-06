import Grid from "@mui/material/Grid";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import {
  Control,
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UnpackNestedValue,
} from "react-hook-form";
import ControlledTextInput from "./ControlledTextInput";

interface ControlledCountryCodePhoneInputOwnProps<T extends FieldValues>
  extends Omit<OutlinedInputProps, "defaultValue" | "name"> {
  control: Control<T>;
  defaultcountrycode?: UnpackNestedValue<PathValue<T, Path<T>>>;
  defaultphonenumber?: UnpackNestedValue<PathValue<T, Path<T>>>;
  countrycodeformerror?: FieldError;
  phonenumberformerror?: FieldError;
  countrycodename?: Path<T>;
  phonenumbername?: Path<T>;
  lightbg?: booleanInteger;
}

const ControlledCountryCodePhoneInput = <T extends FieldValues>(
  props: ControlledCountryCodePhoneInputOwnProps<T>
) => {
  const {
    control,
    defaultcountrycode,
    defaultphonenumber,
    countrycodeformerror,
    phonenumberformerror,
    countrycodename,
    phonenumbername,
    lightbg,
  } = props;

  return (
    <Grid item sm={6} xs={12}>
      <Grid container flexDirection="row" columnSpacing={1}>
        <Grid item xs={4}>
          <ControlledTextInput
            control={control}
            name={countrycodename || ("countryCode" as Path<T>)}
            label="Country Code"
            formerror={countrycodeformerror}
            type="number"
            defaultinput={defaultcountrycode}
            lightbg={lightbg}
          />
        </Grid>
        <Grid item xs={8}>
          <ControlledTextInput
            control={control}
            name={phonenumbername || ("phoneNumber" as Path<T>)}
            label="Phone Number"
            formerror={phonenumberformerror}
            type="tel"
            defaultinput={defaultphonenumber}
            lightbg={lightbg}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

ControlledCountryCodePhoneInput.defaultProps = {
  defaultcountrycode: "60",
  defaultphonenumber: "",
  countrycodeformerror: null,
  phonenumberformerror: null,
  countrycodename: "",
  phonenumbername: "",
  lightbg: 0,
};

export default ControlledCountryCodePhoneInput;
