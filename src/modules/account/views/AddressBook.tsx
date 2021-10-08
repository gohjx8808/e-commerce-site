import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import WorkIcon from '@mui/icons-material/Work';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React from 'react';
import {
  useAppDispatch, useAppSelector,
} from '../../../hooks';
import AddressChip from '../../../styledComponents/AddressChip';
import SmUpDivider from '../../../styledComponents/SmUpDivider';
import { homeColor, workColor } from '../../../utils/constants';
import { internationalPhoneNumberFormatter } from '../../../utils/helper';
import {
  toggleAddressModal,
  toggleDeleteAddressConfirmationModal,
  toggleIsDirectAction,
  updateAddressActionType,
  updateSelectedAddress,
} from '../src/accountReducer';
import AddressModal from './AddressModal';
import DeleteAddressConfirmationModal from './DeleteAddressConfirmationModal';

const AddressBook = () => {
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
      <Grid container justifyContent="flex-end" alignItems="center" marginBottom={3}>
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
                  <Grid item xs={12} marginTop={3}>
                    <Grid container justifyContent="space-between" alignItems="center" direction="row">
                      <Grid item lg={7} md={10} xs={12}>
                        <Grid container alignItems="center" direction="row">
                          <Grid item md={3} sm={4} xs={12}>
                            <Grid container direction="row" spacing={1}>
                              <Grid item>
                                <PersonIcon />
                              </Grid>
                              <Grid item>
                                <Typography fontWeight="bold">
                                  {address.fullName}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <SmUpDivider orientation="vertical" flexItem variant="middle" />
                          <Grid item md={3} sm={3} xs={12}>
                            <Grid container direction="row" spacing={1}>
                              <Grid item>
                                <PhoneIphoneIcon />
                              </Grid>
                              <Grid item>
                                <Typography fontWeight="bold">
                                  {internationalPhoneNumberFormatter(address.phoneNumber)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <SmUpDivider orientation="vertical" flexItem variant="middle" />
                          <Grid item md={3} sm={4} xs={12}>
                            <Grid container direction="row" spacing={1}>
                              <Grid item>
                                <EmailIcon />
                              </Grid>
                              <Grid item>
                                <Typography fontWeight="bold">
                                  {address.email}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          {address.tag && (
                            <Grid item marginLeft={1} display={{ xs: 'none', md: 'flex' }}>
                              <AddressChip
                                customcolor={address.tag === 'Home' ? homeColor : workColor}
                                label={address.tag}
                                variant="outlined"
                                icon={address.tag === 'Home' ? <HomeIcon /> : <WorkIcon />}
                              />
                            </Grid>
                          )}
                          {address.defaultOption === '1' && (
                            <Grid item marginLeft={1} display={{ xs: 'none', md: 'block' }}>
                              <AddressChip
                                customcolor="red"
                                label="Default"
                                variant="outlined"
                              />
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item display={{ xs: 'none', md: 'flex' }}>
                        <IconButton color="secondary" onClick={() => onEditAddress(address)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          sx={{ color: 'red' }}
                          onClick={() => onDeleteAddress(address)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" spacing={1} marginBottom={{ lg: 3 }}>
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
                  <Grid
                    container
                    justifyContent={address.defaultOption === '1' ? 'flex-start' : 'space-between'}
                    alignItems="center"
                    display={{ xs: 'flex', md: 'none' }}
                    marginBottom={{ xs: 3, lg: 0 }}
                  >
                    {address.tag && (
                      <Grid item>
                        <AddressChip
                          customcolor={address.tag === 'Home' ? homeColor : workColor}
                          label={address.tag}
                          variant="outlined"
                          icon={address.tag === 'Home' ? <HomeIcon /> : <WorkIcon />}
                        />
                      </Grid>
                    )}
                    {address.defaultOption === '1' && (
                      <Grid item marginLeft={1}>
                        <AddressChip
                          customcolor="red"
                          label="Default"
                          variant="outlined"
                        />
                      </Grid>
                    )}
                    <Grid item xs={address.defaultOption === '1' || (address.defaultOption === '0' && !address.tag) ? 12 : 6}>
                      <Grid container justifyContent="flex-end" alignItems="center" display={{ xs: 'flex', md: 'none' }}>
                        <IconButton color="secondary" onClick={() => onEditAddress(address)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          sx={{ color: 'red' }}
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
