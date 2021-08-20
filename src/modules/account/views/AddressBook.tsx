import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {
  Add, Delete, Edit, Email, Home, Person, Phone, Work,
} from '@material-ui/icons';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { internationalPhoneNumberFormatter } from '../../../utils/helper';
import {
  toggleAddressModal,
  toggleDeleteAddressConfirmationModal,
  updateAddressActionType,
  updateSelectedAddress,
} from '../src/accountReducer';
import accountStyles from '../src/accountStyles';
import AddressModal from './AddressModal';
import DeleteAddressConfirmationModal from './DeleteAddressConfirmationModal';

const AddressBook = () => {
  const styles = accountStyles();
  const dispatch = useAppDispatch();
  const addressList = useAppSelector((state) => state.auth.currentUser.addressBook);

  const onAddAddress = () => {
    dispatch(updateAddressActionType('Add'));
    dispatch(toggleAddressModal(true));
  };

  const onEditAddress = (selectedAddress:account.finalSubmitAddEditAddressPayload) => {
    dispatch(updateSelectedAddress(selectedAddress));
    dispatch(updateAddressActionType('Edit'));
    dispatch(toggleAddressModal(true));
  };

  const onDeleteAddress = (selectedAddress:account.finalSubmitAddEditAddressPayload) => {
    dispatch(updateSelectedAddress(selectedAddress));
    dispatch(toggleDeleteAddressConfirmationModal(true));
  };

  return (
    <Grid item xs={12}>
      <Grid container justifyContent="flex-end" alignItems="center" className={styles.bottomSpacing}>
        <Button variant="contained" startIcon={<Add />} color="secondary" onClick={onAddAddress}>
          Add New Address
        </Button>
      </Grid>
      {addressList && addressList.length > 0
        ? (
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              {addressList.map((address) => (
                <Grid key={address.addressLine1}>
                  <Divider />
                  <Grid item xs={12} className={styles.topSpacing}>
                    <Grid container justifyContent="space-between" alignItems="center" direction="row">
                      <Grid item>
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
                          {address.tag && (
                            <Grid item className={styles.tagChipPadding}>
                              <Chip
                                className={address.tag === 'Home' ? styles.homeTagColor : styles.workTagColor}
                                label={address.tag}
                                variant="outlined"
                                icon={address.tag === 'Home' ? <Home className={styles.homeTagColor} /> : <Work className={styles.workTagColor} />}
                              />
                            </Grid>
                          )}
                          {address.defaultOption === '1' && (
                            <Grid item className={styles.tagChipPadding}>
                              <Chip
                                className={styles.defaultColor}
                                label="Default"
                                variant="outlined"
                              />
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item>
                        <IconButton color="secondary" onClick={() => onEditAddress(address)}>
                          <Edit />
                        </IconButton>
                        <IconButton
                          className={styles.defaultColor}
                          onClick={() => onDeleteAddress(address)}
                        >
                          <Delete />
                        </IconButton>
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
                </Grid>
              ))}
            </Grid>
          </Grid>
        ) : (
          <Grid container justifyContent="center" alignItems="center">
            <Typography>No address added yet!</Typography>
          </Grid>
        )}
      <AddressModal />
      <DeleteAddressConfirmationModal />
    </Grid>
  );
};

export default AddressBook;
