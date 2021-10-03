import React from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import productStyle from '../src/productStyle';
import { updateSelectedAddress } from '../../account/src/accountReducer';
import useGlobalStyles from '../../../useGlobalStyles';
import { defaultAddressData } from '../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import StyledListItem from '../../../styledComponents/StyledListItem';

interface CheckoutAddressListModalOwnProps{
  isVisible:boolean
  toggleModal:()=>void
}

const CheckoutAddressListModal = (props:CheckoutAddressListModalOwnProps) => {
  const dispatch = useAppDispatch();
  const globalStyles = useGlobalStyles();
  const styles = productStyle();
  const { isVisible, toggleModal } = props;
  const addressList = useAppSelector((state) => state.auth.currentUser.addressBook);
  const selectedAddress = useAppSelector((state) => state.account.selectedAddress);

  const onSelectAddress = (address:account.submitAddEditAddressPayload) => {
    dispatch(updateSelectedAddress(address));
    toggleModal();
  };

  const clearSelection = () => {
    dispatch(updateSelectedAddress(defaultAddressData));
    toggleModal();
  };

  return (
    <Dialog onClose={toggleModal} aria-labelledby="addressBook" open={isVisible} fullWidth>
      <DialogTitle id="addressBook">
        <Grid container justifyContent="space-between">
          <Typography variant="h4">Address Book</Typography>
          {selectedAddress.addressLine1 && <Button variant="outlined" color="secondary" onClick={clearSelection}>Clear selection</Button>}
        </Grid>
      </DialogTitle>
      {addressList ? (
        <List>
          {addressList.map((address) => (
            <StyledListItem
              selected={address === selectedAddress}
              onClick={() => onSelectAddress(address)}
              key={address.addressLine1}
            >
              <ListItemText
                primary={(
                  <>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography className={globalStyles.boldText}>
                          {address.fullName}
                        </Typography>
                      </Grid>
                      <Divider orientation="vertical" flexItem variant="middle" />
                      <Grid item xs={5}>
                        <Typography className={globalStyles.boldText}>
                          {address.phoneNumber}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography className={globalStyles.boldText}>{address.email}</Typography>
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
                      {address.outsideMalaysiaState ? address.outsideMalaysiaState : address.state}
                      {', '}
                      {address.country}
                    </Typography>
                  </>
                )}
              />
            </StyledListItem>
          ))}
        </List>
      ) : (
        <Grid container justifyContent="center" className={styles.bottomSpacing}>
          <Typography variant="h6">No address is added yet!</Typography>
        </Grid>
      )}
    </Dialog>
  );
};

export default CheckoutAddressListModal;
