import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface ControlledCheckboxOwnProps{
  control:Control,
  label?:string,
  name:string,
  defaultValue?:boolean
  error?:FieldError
}

const useStyles = makeStyles({
  unFocusStyle: {
    color: 'white',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'lightgrey',
    },
  },
  unFocusLabel: {
    color: 'white',
  },
  formControl: {
    width: '80%',
    marginTop: 5,
    marginBottom: 5,
  },
});

const ControlledCheckbox = (props:ControlledCheckboxOwnProps) => {
  const {
    control,
    label,
    name,
    defaultValue,
    error,
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <>
          <FormControlLabel
            control={(
              <Checkbox
                checked={value}
                onChange={(event) => onChange(event.target.checked)}
                name={name}
              />
            )}
            label={label}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </>
      )}
      defaultValue={defaultValue}
    />
  );
};

ControlledCheckbox.defaultProps = {
  defaultValue: false,
  label: '',
  error: null,
};

export default ControlledCheckbox;
