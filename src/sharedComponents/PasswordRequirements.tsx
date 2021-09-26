import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

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
    borderRadius: 2,
    padding: 5,
    margin: 10,
  },
  whiteTitle: {
    color: 'white',
    textAlign: 'center',
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
      key: 'containsAC',
      met: false,
      label: 'At least 1 alphabetical character',
    }, {
      key: 'containsN',
      met: false,
      label: 'At least 1 number',
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
  }, []);

  const validatePassword = useCallback(() => {
    toggleMet('containsAC', /^[A-Za-z]/.test(password));
    toggleMet('containsN', /\d/.test(password));
    toggleMet('contains8C', password ? password.length >= 8 : false);
    toggleMet('passwordMatch', password !== undefined && password !== '' && password === rePassword);
  }, [password, rePassword, toggleMet]);

  useEffect(() => {
    if (password !== undefined) {
      validatePassword();
    }
  }, [password, rePassword, validatePassword]);

  return (
    <Grid item xs={12} sm={9} className={styles.passwordRequirementContainer}>
      <Grid container justifyContent="center" alignItems="center">
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
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} lg={5}>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              {meetsReq ? (
                <DoneIcon className={checklistStyle.met} />
              ) : (
                <CloseIcon className={checklistStyle.whiteTitle} />
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
    </Grid>
  );
};

export default PasswordRequirements;
