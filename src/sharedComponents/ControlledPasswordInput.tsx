import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Cancel, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

type variantData='standard' | 'filled' | 'outlined'

interface ControlledPasswordInputOwnProps{
  control:Control,
  label?:string,
  variant?:variantData,
  name:string,
  defaultValue?:string
  error?:FieldError
}

const useStyles = makeStyles((theme) => ({
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
  container: {
    width: '80%',
    marginTop: 5,
    marginBottom: 5,
  },
}));

const ControlledPasswordInput = (props:ControlledPasswordInputOwnProps) => {
  const {
    control, label, variant, name, defaultValue, error,
  } = props;

  const [secure, setSecure] = useState(true);

  const styles = useStyles();
  const theme = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <FormControl variant={variant} className={styles.container}>
          <InputLabel htmlFor="outlined-adornment-password" classes={{ root: styles.unFocusLabel }}>{label}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={!secure ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setSecure(!secure)}
                  edge="end"
                  className={styles.unFocusLabel}
                >
                  {!secure ? <Visibility /> : <VisibilityOff />}
                </IconButton>
                <IconButton
                  edge="end"
                >
                  {error && <Cancel color="error" />}
                </IconButton>
              </InputAdornment>
            )}
            labelWidth={70}
            classes={{ root: styles.unFocusStyle }}
            error={!!error}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </FormControl>
      )}
      defaultValue={defaultValue}
    />
  );
};

ControlledPasswordInput.defaultProps = {
  defaultValue: '',
  variant: undefined,
  label: '',
  error: null,
};

export default ControlledPasswordInput;
