import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import WorkIcon from '@material-ui/icons/Work';
import clsx from 'clsx';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
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
                      <Grid item>
                        <Grid container alignItems="center" direction="row">
                          <Grid item className={styles.xsFullWidth}>
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
                          <Grid item className={styles.xsFullWidth}>
                            <Grid container direction="row" spacing={1}>
                              <Grid item>
                                <PhoneIcon />
                              </Grid>
                              <Grid item>
                                <Typography className={globalStyles.boldText}>
                                  {internationalPhoneNumberFormatter(address.phoneNumber)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Divider orientation="vertical" flexItem variant="middle" className={styles.smUpView} />
                          <Grid item className={styles.xsFullWidth}>
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
                      <Grid item className={styles.desktopView}>
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
                  <Grid container justifyContent={address.defaultOption === '1' ? 'flex-start' : 'space-between'} alignItems="center" className={clsx(styles.mobileView, styles.mdDownBottomSpacing)}>
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
                      <Grid container justifyContent="flex-end" alignItems="center" className={styles.mobileView}>
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
