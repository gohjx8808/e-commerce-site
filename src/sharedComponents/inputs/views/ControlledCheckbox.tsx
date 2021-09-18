import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface ControlledCheckboxOwnProps extends CheckboxProps{
  control:Control,
  label?:string,
  error?:FieldError
}

const ControlledCheckbox = (props:ControlledCheckboxOwnProps) => {
  const {
    control,
    label,
    defaultChecked,
    name,
    error,
  } = props;

  return (
    <Controller
      control={control}
      name={name!}
      render={({
        field: {
          onChange,
        },
      }) => (
        <>
          <FormControlLabel
            control={(
              <Checkbox
                onChange={(event) => onChange(event.target.checked)}
                {...props}
              />
            )}
            label={label}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </>
      )}
      defaultValue={defaultChecked}
    />
  );
};

ControlledCheckbox.defaultProps = {
  label: '',
  error: null,
};

export default ControlledCheckbox;
