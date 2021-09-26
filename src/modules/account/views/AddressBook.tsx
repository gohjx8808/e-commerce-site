import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import clsx from 'clsx';
import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import WorkIcon from '@mui/icons-material/Work';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  useAppDispatch, useAppSelector, useMdUpMediaQuery, useSmUDownMediaQuery,
} from '../../../hooks';
import { internationalPhoneNumberFormatter } from '../../../utils/helper';
import useGlobalStyles from '../../../useGlobalStyles';
import {
  toggleAddressModal,
  toggleDeleteAddressConfirmationModal,
  toggleIsDirectAction,
  updateAddressActionType,
  updateSelectedAddress,
} from '../src/accountReducer';
import accountStyles from '../src/accountStyles';
import AddressModal from './AddressModal';
import DeleteAddressConfirmationModal from './DeleteAddressConfirmationModal';

const AddressBook = () => {
  const styles = accountStyles();
  const globalStyles = useGlobalStyles();
  const dispatch = useAppDispatch();
  const addressList = useAppSelector((state) => state.auth.currentUser.addressBook);

  const onAddAddress = () => {
    dispatch(updateAddressActionType('Add'));
    dispatch(toggleIsDirectAction(true));
    dispatch(toggleAddressModal(true));
  };

  const onEditAddress = (selectedAddress:account.submitAddEditAddressPayload) => {
    dispatch(updateSelectedAddress(selectedAddress));
    dispatch(updateAddressActionType('Edit'));
    dispatch(toggleIsDirectAction(true));
    dispatch(toggleAddressModal(true));
  };

  const onDeleteAddress = (selectedAddress:account.submitAddEditAddressPayload) => {
    dispatch(updateSelectedAddress(selectedAddress));
    dispatch(toggleDeleteAddressConfirmationModal(true));
  };

  const mdView = useMdUpMediaQuery();
  const smView = useSmUDownMediaQuery();

  return (
    <Grid item xs={12}>
      <Grid container justifyContent="flex-end" alignItems="center" className={styles.bottomSpacing}>
        <Button variant="contained" startIcon={<AddIcon />} color="secondary" onClick={onAddAddress}>
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
                      <Grid item lg={7} md={10} xs={12}>
                        <Grid container alignItems="center" direction="row">
                          <Grid item md={3} sm={4} xs={12} className={styles.xsFullWidth}>
                            <Grid container direction="row" spacing={1}>
                              <Grid item>
                                <PersonIcon />
                              </Grid>
                              <Grid item>
                                <Typography className={globalStyles.boldText}>
                                  {address.fullName}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Divider orientation="vertical" flexItem variant="middle" className={styles.smUpView} />
                          <Grid item md={3} sm={3} xs={12} className={styles.xsFullWidth}>
                            <Grid container direction="row" spacing={1}>
                              <Grid item>
                                <PhoneIphoneIcon />
                              </Grid>
                              <Grid item>
                                <Typography className={globalStyles.boldText}>
                                  {internationalPhoneNumberFormatter(address.phoneNumber)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Divider orientation="vertical" flexItem variant="middle" className={styles.smUpView} />
                          <Grid item md={3} sm={4} xs={12} className={styles.xsFullWidth}>
                            <Grid container direction="row" spacing={1}>
                              <Grid item>
                                <EmailIcon />
                              </Grid>
                              <Grid item>
                                <Typography className={globalStyles.boldText}>
                                  {address.email}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          {address.tag && (
                            <Grid item className={clsx(styles.tagChipPadding, styles.lgUpView)}>
                              <Chip
                                className={address.tag === 'Home' ? styles.homeTagColor : styles.workTagColor}
                                label={address.tag}
                                variant="outlined"
                                icon={address.tag === 'Home' ? <HomeIcon className={styles.homeTagColor} /> : <WorkIcon className={styles.workTagColor} />}
                              />
                            </Grid>
                          )}
                          {address.defaultOption === '1' && (
                            <Grid item className={clsx(styles.tagChipPadding, styles.lgUpView)}>
                              <Chip
                                className={styles.defaultColor}
                                label="Default"
                                variant="outlined"
                              />
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                      {mdView && (
                        <Grid item>
                          <IconButton color="secondary" onClick={() => onEditAddress(address)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            className={styles.defaultColor}
                            onClick={() => onDeleteAddress(address)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container direction="row" spacing={1} className={styles.lgBottomSpacing}>
                    <Grid item>
                      <HomeIcon />
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
                  {smView && (
                    <Grid container justifyContent={address.defaultOption === '1' ? 'flex-start' : 'space-between'} alignItems="center" className={styles.mdDownBottomSpacing}>
                      {address.tag && (
                      <Grid item>
                        <Chip
                          className={address.tag === 'Home' ? styles.homeTagColor : styles.workTagColor}
                          label={address.tag}
                          variant="outlined"
                          icon={address.tag === 'Home' ? <HomeIcon className={styles.homeTagColor} /> : <WorkIcon className={styles.workTagColor} />}
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
                      <Grid item xs={address.defaultOption === '1' || (address.defaultOption === '0' && !address.tag) ? 12 : 6}>
                        {smView && (
                        <Grid container justifyContent="flex-end" alignItems="center">
                          <IconButton color="secondary" onClick={() => onEditAddress(address)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            className={styles.defaultColor}
                            onClick={() => onDeleteAddress(address)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                        )}
                      </Grid>
                    </Grid>
                  )}
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
