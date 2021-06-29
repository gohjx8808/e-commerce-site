import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Close, Done } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';

interface PasswordRequirementsOwnProps{
  password:string
  rePassword:string
}

const useStyles = makeStyles({
  met: {
    color: '#32cd32',
  },
  passwordRequirementContainer: {
    borderColor: 'white',
    borderWidth: 1,
    border: 'dashed',
    width: '40%',
    borderRadius: 2,
    padding: 5,
    margin: 10,
  },
  whiteTitle: {
    color: 'white',
  },
  passwordRequirementInnerContainer: {
    width: '55%',
  },
});

const PasswordRequirements = (props:PasswordRequirementsOwnProps) => {
  const { password, rePassword } = props;
  const styles = useStyles();

  const [passwordRequirements, setPasswordRequirements] = useState([
    {
      key: 'contains8C',
      met: false,
      label: 'Minimum 8 characters',
    }, {
      key: 'containsUL',
      met: false,
      label: 'At least 1 uppercase letter',
    }, {
      key: 'containsLL',
      met: false,
      label: 'At least 1 lowercase letter',
    }, {
      key: 'containsN',
      met: false,
      label: 'At least 1 number',
    }, {
      key: 'containsSC',
      met: false,
      label: 'At least 1 special character',
    }, {
      key: 'passwordMatch',
      met: false,
      label: 'Passwords match',
    },
  ]);

  const toggleMet = useCallback((targetKey:string, metRequirement:boolean) => {
    const targetEntryIndex = passwordRequirements.findIndex((entry) => entry.key === targetKey);
    const items = [...passwordRequirements];
    items[targetEntryIndex].met = metRequirement;
    setPasswordRequirements(items);
  }, [passwordRequirements]);

  const validatePassword = useCallback(() => {
    toggleMet('containsUL', password ? password.toLowerCase() !== password : false);
    toggleMet('containsLL', password ? password.toUpperCase() !== password : false);
    toggleMet('containsN', /\d/.test(password));
    toggleMet('containsSC', /[!@#$%^&*,.()\-+_={}[\]{};'\\:"|\\/<>?~`]/g.test(password));
    toggleMet('contains8C', password ? password.length >= 8 : false);
    toggleMet('passwordMatch', password !== undefined && password !== '' && password === rePassword);
  }, [password, rePassword, toggleMet]);

  useEffect(() => {
    if (password !== undefined) {
      validatePassword();
    }
  }, [password, rePassword, validatePassword]);

  return (
    <Grid item className={styles.passwordRequirementContainer}>
      <Grid container justify="center" alignItems="center">
        <Typography variant="h6" className={styles.whiteTitle}>Password Requirements:</Typography>
        {passwordRequirements.map((item) => <ChecklistItem data={item} key={item.key} />)}
      </Grid>
    </Grid>
  );
};

interface ChecklistItemOwnProps{
  data:passwordRequirementData
}

interface passwordRequirementData{
  key:string
  label:string
  met:boolean
}

const ChecklistItem = (props:ChecklistItemOwnProps) => {
  const { data } = props;
  const meetsReq = data.met;

  const checklistStyle = useStyles();

  return (
    <Grid item xs={12}>
      <Grid container justify="center">
        <Grid container className={checklistStyle.passwordRequirementInnerContainer} direction="row" alignItems="center">
          <Grid item>
            {meetsReq ? (
              <Done className={checklistStyle.met} />
            ) : (
              <Close className={checklistStyle.whiteTitle} />
            )}
          </Grid>
          <Grid item>
            <Typography className={meetsReq ? checklistStyle.met : checklistStyle.whiteTitle}>
              {data.label}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PasswordRequirements;
