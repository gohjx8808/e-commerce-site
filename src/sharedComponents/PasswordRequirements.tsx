import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Close, Done } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import authenticationStyles from '../modules/Authentication/src/authenticationStyles';

interface PasswordRequirementsOwnProps{
  password:string
  rePassword:string
}

const useStyles = makeStyles({
  met: {
    color: '#009900',
  },
  notMet: {
    color: 'rgba(0,0,0,0.5)',
  },
});

const PasswordRequirements = (props:PasswordRequirementsOwnProps) => {
  const { password, rePassword } = props;
  const styles = authenticationStyles();

  const [contains8C, setContains8C] = useState(false);
  const [containsUL, setContainsUL] = useState(false);
  const [containsLL, setContainsLL] = useState(false);
  const [containsN, setContainsN] = useState(false);
  const [containsSC, setContainsSC] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const validatePassword = useCallback(() => {
    setContainsUL(password ? password.toLowerCase() !== password : false);
    setContainsLL(password ? password.toUpperCase() !== password : false);
    setContainsN(/\d/.test(password));
    setContainsSC(/[!@#$%^&*,.()\-+_={}[\]{};'\\:"|\\/<>?~`]/g.test(password));
    setContains8C(password ? password.length >= 8 : false);
    setPasswordMatch(password !== undefined && password !== '' && password === rePassword);
  }, [password, rePassword]);

  useEffect(() => {
    validatePassword();
  }, [password, rePassword, validatePassword]);

  const checklists = [
    ['Minimum 8 characters', contains8C],
    ['At least 1 uppercase letter', containsUL],
    ['At least 1 lowercase letter', containsLL],
    ['At least 1 number', containsN],
    ['At least 1 special character', containsSC],
    ['Passwords match', passwordMatch],
  ];

  return (
    <Grid item className={styles.passwordRequirementContainer}>
      <Grid container justify="center" alignItems="center">
        <Typography variant="h6" className={styles.loginTitle}>Password Requirements:</Typography>
        {checklists.map((item) => <ChecklistItem data={item} />)}
      </Grid>
    </Grid>
  );
};

const ChecklistItem = ({ data }) => {
  const label = data[0];
  const meetsReq = data[1];

  const checklistStyle = useStyles();

  return (
    <Grid item xs={12}>
      <Grid container>
        {meetsReq ? (
          <Done className={checklistStyle.met} />
        ) : (
          <Close className={checklistStyle.notMet} />
        )}
        <Typography className={meetsReq ? checklistStyle.met : checklistStyle.notMet}>
          {label}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PasswordRequirements;
