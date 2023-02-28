import { genderOptions } from "@utils/constants";
import {
  FieldValues,
  Path,
  PathValue,
  UnpackNestedValue,
} from "react-hook-form";
import ControlledPicker, { ControlledPickerProps } from "./ControlledPicker";

interface ControlledGenderPickerOwnProps<T extends FieldValues>
  extends Omit<ControlledPickerProps<T>, "options" | "label"> {
  defaultGender?: string;
}

const ControlledGenderPicker = <T extends FieldValues>(
  props: ControlledGenderPickerOwnProps<T>
) => {
  const { defaultGender } = props;

  return (
    <ControlledPicker
      {...props}
      label="Gender"
      options={genderOptions}
      defaultcheck={
        genderOptions.find(
          (gender) => gender.id === defaultGender
        ) as UnpackNestedValue<PathValue<T, Path<T>>>
      }
    />
  );
};

ControlledGenderPicker.defaultProps = {
  defaultGender: "",
};

export default ControlledGenderPicker;
