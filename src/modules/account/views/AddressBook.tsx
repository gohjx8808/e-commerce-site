import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Add } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleAddressModal, updateAddressActionType } from '../src/accountReducer';
import AddressModal from './AddressModal';
import accountStyles from '../src/accountStyles';

const AddressBook = () => {
  const styles = accountStyles();
  const dispatch = useAppDispatch();
  const addressList = useAppSelector((state) => state.auth.currentUser.addressBook);

  const showAddressModal = (actionType:string) => {
    dispatch(updateAddressActionType(actionType));
    dispatch(toggleAddressModal(true));
  };

  console.log(addressList);

  return (
    <Grid item xs={12}>
      <Grid container justifyContent="flex-end" alignItems="center" className={styles.bottomSpacing}>
        <Button variant="contained" startIcon={<Add />} color="secondary" onClick={() => showAddressModal('Add')}>
          Add New Address
        </Button>
      </Grid>
      {addressList && addressList.length > 0
        ? (
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              {addressList.map((address) => (
                <>
                  <Divider />
                  <Grid item xs={12} className={styles.addressListContainer}>
                    <Typography className={styles.boldText}>{address.fullName}</Typography>
                  </Grid>
                </>
              ))}
            </Grid>
          </Grid>
        ) : (
          <Grid container justifyContent="center" alignItems="center">
            <Typography>No address added yet!</Typography>
          </Grid>
        )}
      <AddressModal />
    </Grid>
  );
};

export default AddressBook;
