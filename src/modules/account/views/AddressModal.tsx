import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import ControlledPicker from '../../../sharedComponents/ControlledPicker';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import { stateOptions } from '../../../utils/constants';
import { submitAddAddressAction, toggleAddressModal } from '../src/accountReducer';
import { addressSchema } from '../src/accountScheme';
import accountStyles from '../src/accountStyles';

const AddressModal = () => {
  const styles = accountStyles();
  const dispatch = useAppDispatch();
  const isAddressModalOpen = useAppSelector((state) => state.account.isAddressModalOpen);
  const addressActionType = useAppSelector((state) => state.account.addressActionType);
  const selectedAddress = useAppSelector((state) => state.account.selectedAddress);
  const {
    control, handleSubmit, formState: { errors }, watch, setValue,
  } = useForm({
    resolver: yupResolver(addressSchema),
  });

  const closeModal = () => {
    dispatch(toggleAddressModal(false));
  };

  const onSubmitForm = (hookData:account.submitAddEditAddressPayload) => {
    dispatch(submitAddAddressAction(hookData));
  };

  const outsideMalaysiaState = (selectedAddress && selectedAddress.state.value === 'Outside Malaysia') || (watch('state') && watch('state').value === 'Outside Malaysia');

  useEffect(() => {
    if (!outsideMalaysiaState) {
      setValue('country', 'Malaysia');
    } else {
      setValue('country', '');
    }
  }, [setValue, outsideMalaysiaState]);

  return (
    <Dialog
      open={isAddressModalOpen}
      onClose={closeModal}
      aria-labelledby="addressActionModal"
      fullWidth
      maxWidth="md"
    >
      <Grid container justifyContent="center">
        <DialogTitle id="addressActionModal">
          {addressActionType}
          {' '}
          Address
        </DialogTitle>
      </Grid>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <DialogContent>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <ControlledTextInput
                control={control}
                name="fullName"
                variant="outlined"
                lightBg
                label="Full Name"
                labelWidth={68}
                defaultValue={selectedAddress && selectedAddress.fullName}
                error={errors.fullName}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="phoneNumber"
                variant="outlined"
                lightBg
                label="Phone Number"
                labelWidth={100}
                defaultValue={selectedAddress && selectedAddress.phoneNumber ? selectedAddress.phoneNumber : '60'}
                error={errors.phoneNumber}
                startAdornment={(
                  <InputAdornment position="start">
                    +
                  </InputAdornment>
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="email"
                variant="outlined"
                label="Email Address"
                labelWidth={95}
                lightBg
                error={errors.email}
                defaultValue={selectedAddress && selectedAddress.email}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextInput
                control={control}
                name="addressLine1"
                variant="outlined"
                label="Address Line 1"
                labelWidth={100}
                lightBg
                error={errors.addressLine1}
                defaultValue={selectedAddress && selectedAddress.addressLine1}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextInput
                control={control}
                name="addressLine2"
                variant="outlined"
                label="Address Line 2"
                labelWidth={100}
                lightBg
                defaultValue={selectedAddress && selectedAddress.addressLine2}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="postcode"
                variant="outlined"
                label="Postcode"
                lightBg
                labelWidth={60}
                maxLength={10}
                error={errors.postcode}
                defaultValue={selectedAddress && selectedAddress.postcode}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="city"
                variant="outlined"
                label="City"
                lightBg
                labelWidth={25}
                error={errors.city}
                defaultValue={selectedAddress && selectedAddress.city}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledPicker
                control={control}
                name="state"
                variant="outlined"
                lightBg
                label="State"
                options={stateOptions}
                defaultValue={selectedAddress && selectedAddress.state.value}
                error={errors.state}
              />
            </Grid>
            {outsideMalaysiaState && (
              <Grid item lg={6} xs={12}>
                <ControlledTextInput
                  control={control}
                  name="outsideMalaysiaState"
                  variant="outlined"
                  label="Foreign Country State"
                  labelWidth={145}
                  lightBg
                  error={errors.outsideMalaysiaState}
                  defaultValue={selectedAddress && selectedAddress.outsideMalaysiaState}
                />
              </Grid>
            )}
            <Grid item lg={outsideMalaysiaState ? 12 : 6} xs={12}>
              <ControlledTextInput
                control={control}
                name="country"
                variant="outlined"
                label="Country"
                labelWidth={55}
                lightBg
                error={errors.country}
                defaultValue={selectedAddress && selectedAddress.country}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={styles.modalSubmitContainer}>
          <Button onClick={closeModal} color="secondary">
            Cancel
          </Button>
          <Button color="secondary" variant="contained" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddressModal;
