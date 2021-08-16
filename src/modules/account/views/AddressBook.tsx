import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Add } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleAddressModal, updateAddressActionType } from '../src/accountReducer';

const AddressBook = () => {
  const dispatch = useAppDispatch();
  const addressList = useAppSelector((state) => state.auth.currentUser.addressBook);

  const showAddressModal = (actionType:string) => {
    dispatch(toggleAddressModal(true));
    dispatch(updateAddressActionType(actionType));
  };

  return (
    <Grid item xs={12}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Button variant="contained" startIcon={<Add />} color="secondary" onClick={() => showAddressModal('Add')}>Add New Address</Button>
      </Grid>
      {addressList && addressList.length > 0
        ? (
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        ) : (
          <Grid container justifyContent="center" alignItems="center">
            <Typography>No address added yet!</Typography>
          </Grid>
        )}
    </Grid>
  );
};

export default AddressBook;
