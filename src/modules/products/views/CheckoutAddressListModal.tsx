import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { updateSelectedAddress } from '../../account/src/accountReducer';
import productStyle from '../src/productStyle';

interface CheckoutAddressListModalOwnProps{
  isVisible:boolean
  toggleModal:()=>void
}

const CheckoutAddressListModal = (props:CheckoutAddressListModalOwnProps) => {
  const dispatch = useAppDispatch();
  const styles = productStyle();
  const { isVisible, toggleModal } = props;
  const addressList = useAppSelector((state) => state.auth.currentUser.addressBook);
  const selectedAddress = useAppSelector((state) => state.account.selectedAddress);

  const onSelectAddress = (address:account.finalSubmitAddEditAddressPayload) => {
    dispatch(updateSelectedAddress(address));
    toggleModal();
  };

  return (
    <Dialog onClose={toggleModal} aria-labelledby="addressBook" open={isVisible} fullWidth>
      <DialogTitle id="addressBook">Address Book</DialogTitle>
      <List>
        {addressList.map((address) => (
          <ListItem
            button
            selected={address === selectedAddress}
            onClick={() => onSelectAddress(address)}
          >
            <ListItemText
              primary={(
                <>
                  <Grid container>
                    <Grid item xs={5}>
                      <Typography className={styles.boldText}>{address.fullName}</Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem variant="middle" />
                    <Grid item xs={5}>
                      <Typography className={styles.boldText}>{address.phoneNumber}</Typography>
                    </Grid>
                  </Grid>
                  <Typography className={styles.boldText}>{address.email}</Typography>
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
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default CheckoutAddressListModal;
