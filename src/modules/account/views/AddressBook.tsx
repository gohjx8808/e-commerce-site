import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  Add, Email, Home, Person, Phone,
} from '@material-ui/icons';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { internationalPhoneNumberFormatter } from '../../../utils/helper';
import { toggleAddressModal, updateAddressActionType } from '../src/accountReducer';
import accountStyles from '../src/accountStyles';
import AddressModal from './AddressModal';

const AddressBook = () => {
  const styles = accountStyles();
  const dispatch = useAppDispatch();
  const addressList = useAppSelector((state) => state.auth.currentUser.addressBook);

  const showAddressModal = (actionType:string) => {
    dispatch(updateAddressActionType(actionType));
    dispatch(toggleAddressModal(true));
  };

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
                  <Grid item xs={12} className={styles.topSpacing}>
                    <Grid container alignItems="center" direction="row">
                      <Grid item>
                        <Grid container direction="row" spacing={1}>
                          <Grid item>
                            <Person />
                          </Grid>
                          <Grid item>
                            <Typography className={styles.boldText}>
                              {address.fullName}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider orientation="vertical" flexItem variant="middle" />
                      <Grid item>
                        <Grid container direction="row" spacing={1}>
                          <Grid item>
                            <Phone />
                          </Grid>
                          <Grid item>
                            <Typography className={styles.boldText}>
                              {internationalPhoneNumberFormatter(address.phoneNumber)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider orientation="vertical" flexItem variant="middle" />
                      <Grid item>
                        <Grid container direction="row" spacing={1}>
                          <Grid item>
                            <Email />
                          </Grid>
                          <Grid item>
                            <Typography className={styles.boldText}>
                              {address.email}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" spacing={1} className={styles.bottomSpacing}>
                    <Grid item>
                      <Home />
                    </Grid>
                    <Grid item>
                      <Typography>
                        {address.addressLine1}
                        {' '}
                        {address.addressLine2}
                      </Typography>
                      <Typography>
                        {address.postcode}
                        {' '}
                        {address.city}
                      </Typography>
                      <Typography>
                        {address.state === 'Outside Malaysia' ? address.outsideMalaysiaState : address.state}
                        {', '}
                        {address.country}
                      </Typography>
                    </Grid>
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
