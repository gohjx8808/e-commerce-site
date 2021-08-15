import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {
  Cake, Email, Person, Phone, Wc,
} from '@material-ui/icons';
import { DateTime } from 'luxon';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
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
      <Grid item md={10} xs={12}>
        <CardContent>
          <Grid container justifyContent="center" spacing={4} className={styles.verticalSpacing}>
            <Grid item xs={10}>
              <Grid container justifyContent="center" alignItems="center" direction="row" spacing={5}>
                <SingleAccData
                  label="Full Name"
                  data={currentUserDetails.fullName}
                  Icon={<Person />}
                />
                <SingleAccData
                  label="Gender"
                  data={genderMap[currentUserDetails.gender]}
                  Icon={<Wc />}
                />
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid container justifyContent="center" alignItems="center" direction="row" spacing={5}>
                <SingleAccData
                  label="Email"
                  data={currentUserDetails.email}
                  Icon={<Email />}
                />
                <SingleAccData
                  label="Phone No"
                  data={currentUserDetails.phoneNumber}
                  Icon={<Phone />}
                />
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid container justifyContent="center" alignItems="center" direction="row" spacing={5}>
                <SingleAccData
                  label="Date of Birth"
                  data={DateTime.fromISO(currentUserDetails.dob).toLocaleString()}
                  Icon={<Cake />}
                />
                <Grid item xs={6} />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
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
