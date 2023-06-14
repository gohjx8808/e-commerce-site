import { genderOptions } from "@utils/constants";
import { FieldValues, Path, PathValue } from "react-hook-form";
import ControlledPicker, { ControlledPickerProps } from "./ControlledPicker";

interface ControlledGenderPickerOwnProps<T extends FieldValues>
  extends Omit<ControlledPickerProps<T>, "options" | "label"> {
  defaultGender?: string;
}

const ControlledGenderPicker = <T extends FieldValues>(
  props: ControlledGenderPickerOwnProps<T>
) => {
  const { defaultGender, ...rest } = props;

  return (
    <ControlledPicker
      {...rest}
      label="Gender"
      options={genderOptions}
      defaultCheck={
        genderOptions.find(
          (gender) => gender.id === defaultGender
        ) as PathValue<T, Path<T>>
      }
    />
  );
};

ControlledGenderPicker.defaultProps = {
  defaultGender: "",
};

export default ControlledGenderPicker;
