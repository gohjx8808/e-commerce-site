import CakeIcon from '@mui/icons-material/Cake';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import WcIcon from '@mui/icons-material/Wc';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleEditAccDetailModal } from '../src/accountReducer';
import EditAccDetailModal from './EditAccDetailModal';
import SingleAccData from './SingleAccData';

interface stringDict{
  [key:string]:string
}

const AccountDetails = () => {
  const currentUserDetails = useAppSelector((state) => state.auth.currentUser);
  const genderMap:stringDict = { F: 'Female', M: 'Male' };
  const dispatch = useAppDispatch();

  return (
    <Grid container justifyContent="center" alignItems="center" marginY={3}>
      <Grid item md={10} xs={12}>
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
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
          <SingleAccData
            label="Date of Birth"
            data={dayjs(currentUserDetails.dob).format('DD MMMM YYYY')}
            Icon={<CakeIcon />}
          />
          <Grid item xs={6} />
        </Grid>
        <Grid container justifyContent="flex-end" marginTop={3}>
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
