import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DateTime } from 'luxon';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import CustomBreadcrumbs from '../../../sharedComponents/CustomBreadcrumbs';
import { toggleEditAccDetailModal } from '../src/accountReducer';
import accountStyles from '../src/accountStyles';
import EditAccDetailModal from './EditAccDetailModal';
import SingleAccData from './SingleAccData';

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
            <Grid container justifyContent="center" spacing={4} className={styles.verticalSpacing}>
              <Grid item xs={10}>
                <Grid container justifyContent="center" alignItems="center" direction="row" spacing={2}>
                  <SingleAccData
                    label="Full Name"
                    data={currentUserDetails.fullName}
                  />
                  <SingleAccData
                    label="Gender"
                    data={genderMap[currentUserDetails.gender]}
                  />
                </Grid>
              </Grid>
              <Grid item xs={10}>
                <Grid container justifyContent="center" alignItems="center" direction="row" spacing={2}>
                  <SingleAccData
                    label="Email"
                    data={currentUserDetails.email}
                  />
                  <SingleAccData
                    label="Phone No"
                    data={currentUserDetails.phoneNumber}
                  />
                </Grid>
              </Grid>
              <Grid item xs={10}>
                <Grid container justifyContent="center" direction="row" spacing={2}>
                  <SingleAccData
                    label="Date of Birth"
                    data={DateTime.fromISO(currentUserDetails.dob).toLocaleString()}
                  />
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
