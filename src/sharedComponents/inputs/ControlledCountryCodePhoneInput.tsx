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
  defaultcountrycode?: UnpackNestedValue<PathValue<T, Path<T>>>;
  defaultphonenumber?: UnpackNestedValue<PathValue<T, Path<T>>>;
  countrycodeformerror?: FieldError;
  phonenumberformerror?: FieldError;
  countrycodename?: Path<T>;
  phonenumbername?: Path<T>;
}

const ControlledCountryCodePhoneInput = <T extends FieldValues>(
  props: Omit<ControlledCountryCodePhoneInputOwnProps<T>, "name">
) => {
  const {
    defaultcountrycode,
    defaultphonenumber,
    countrycodeformerror,
    phonenumberformerror,
    countrycodename,
    phonenumbername,
  } = props;

  return (
    <Grid item sm={6} xs={12}>
      <Grid container flexDirection="row" columnSpacing={1}>
        <Grid item xs={4}>
          <ControlledTextInput
            name={countrycodename || ("countryCode" as Path<T>)}
            label="Country Code"
            formerror={countrycodeformerror}
            type="number"
            defaultinput={defaultcountrycode}
            {...props}
          />
        </Grid>
        <Grid item xs={8}>
          <ControlledTextInput
            name={phonenumbername || ("phoneNumber" as Path<T>)}
            label="Phone Number"
            formerror={phonenumberformerror}
            type="tel"
            defaultinput={defaultphonenumber}
            {...props}
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
