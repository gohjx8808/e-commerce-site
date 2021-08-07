import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { DateTime } from 'luxon';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import CustomBreadcrumbs from '../../../sharedComponents/CustomBreadcrumbs';
import accountStyles from '../src/accountStyles';
import EditAccDetailModal from './EditAccDetailModal';
import { toggleEditAccDetailModal } from '../src/accountReducer';

interface stringDict{
  [key:string]:string
}

const AccountDetails = () => {
  const styles = accountStyles();
  const currentUserDetails = useAppSelector((state) => state.auth.currentUser);
  const genderMap:stringDict = { F: 'Female', M: 'Male' };
  const dispatch = useAppDispatch();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={10}>
        <Grid container justifyContent="flex-start" alignItems="center">
          <CustomBreadcrumbs />
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Card>
          <CardContent>
            <Grid container spacing={4} className={styles.verticalSpacing}>
              <Grid item xs={12}>
                <Grid container justifyContent="center" direction="row">
                  <Grid item xs={6}>
                    <Grid container justifyContent="center" direction="column" alignItems="center">
                      <Typography className={styles.boldText}>Full Name</Typography>
                      <Typography>{currentUserDetails.fullName}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container justifyContent="center" direction="column" alignItems="center">
                      <Typography className={styles.boldText}>Gender</Typography>
                      <Typography>{genderMap[currentUserDetails.gender]}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="center" direction="row">
                  <Grid item xs={6}>
                    <Grid container justifyContent="center" direction="column" alignItems="center">
                      <Typography className={styles.boldText}>Email</Typography>
                      <Typography>{currentUserDetails.email}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container justifyContent="center" direction="column" alignItems="center">
                      <Typography className={styles.boldText}>Phone No</Typography>
                      <Typography>{currentUserDetails.phoneNumber}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="center" direction="row">
                  <Grid item xs={6}>
                    <Grid container justifyContent="center" direction="column" alignItems="center">
                      <Typography className={styles.boldText}>Date of Birth</Typography>
                      <Typography>
                        {DateTime.fromISO(currentUserDetails.dob).toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Grid container justifyContent="flex-end" className={styles.editBtnTopSpacing}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(toggleEditAccDetailModal(true))}
          >
            Edit Profile
          </Button>
        </Grid>
        <EditAccDetailModal />
      </Grid>
    </Grid>
  );
};

export default AccountDetails;
