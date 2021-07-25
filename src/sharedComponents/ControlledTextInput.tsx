import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import { Cancel } from '@material-ui/icons';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

type variantData='standard' | 'filled' | 'outlined'

interface ControlledTextInputOwnProps{
  control:Control,
  label?:string,
  type?:string,
  variant?:variantData,
  name:string,
  defaultValue?:string
  error?:FieldError
  labelWidth?:number
  customClassName?:string
  lightBg?:boolean
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

const ControlledTextInput = (props:ControlledTextInputOwnProps) => {
  const {
    control,
    label,
    type,
    variant,
    name,
    defaultValue,
    error,
    labelWidth,
    customClassName,
    lightBg,
  } = props;

  const styles = useStyles();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <FormControl
          variant={variant}
          className={`${styles.formControl} ${customClassName}`}
          style={{
            display: type === 'hidden' ? 'none' : 'flex',
            width: lightBg ? '100%' : '80%',
          }}
        >
          <InputLabel
            htmlFor={name}
            color={lightBg ? 'secondary' : 'primary'}
            classes={{ root: !lightBg ? styles.unFocusLabel : '' }}
            error={!!error}
          >
            {label}
          </InputLabel>
          <OutlinedInput
            id={name}
            type={type}
            value={value}
            onChange={onChange}
            labelWidth={labelWidth}
            color={lightBg ? 'secondary' : 'primary'}
            classes={{ root: !lightBg ? styles.unFocusStyle : '' }}
            error={!!error}
            endAdornment={error && (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                >
                  <Cancel color="error" />
                </IconButton>
              </InputAdornment>
            )}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </FormControl>
      )}
      defaultValue={defaultValue}
    />
  );
};

ControlledTextInput.defaultProps = {
  defaultValue: '',
  variant: undefined,
  type: 'text',
  label: '',
  error: null,
  labelWidth: 70,
  customClassName: '',
  lightBg: false,
};

export default ControlledTextInput;
