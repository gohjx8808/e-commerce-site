import CakeIcon from '@mui/icons-material/Cake';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import WcIcon from '@mui/icons-material/Wc';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
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
                  Icon={<PersonIcon />}
                />
                <SingleAccData
                  label="Gender"
                  data={genderMap[currentUserDetails.gender]}
                  Icon={<WcIcon />}
                />
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid container justifyContent="center" alignItems="center" direction="row" spacing={5}>
                <SingleAccData
                  label="Email"
                  data={currentUserDetails.email}
                  Icon={<EmailIcon />}
                />
                <SingleAccData
                  label="Phone No"
                  data={currentUserDetails.phoneNumber}
                  Icon={<PhoneIphoneIcon />}
                />
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid container justifyContent="center" alignItems="center" direction="row" spacing={5}>
                <SingleAccData
                  label="Date of Birth"
                  data={dayjs(currentUserDetails.dob).format('DD MMMM YYYY')}
                  Icon={<CakeIcon />}
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
