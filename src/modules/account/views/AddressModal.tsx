import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import ControlledPicker from '../../../sharedComponents/ControlledPicker';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import { stateOptions } from '../../../utils/constants';
import { toggleAddressModal } from '../src/accountReducer';

const AddressModal = () => {
  const dispatch = useAppDispatch();
  const isAddressModalOpen = useAppSelector((state) => state.account.isAddressModalOpen);
  const addressActionType = useAppSelector((state) => state.account.addressActionType);
  const selectedAddress = useAppSelector((state) => state.account.selectedAddress);
  const { control, handleSubmit, formState: { errors } } = useForm();

  const closeModal = () => {
    dispatch(toggleAddressModal(false));
  };

  const onSubmitForm = (hookData:account.submitAddEditAddressPayload) => {

  };

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
          <Grid container justifyContent="center" alignItems="center" spacing={1}>
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
            <Grid item xs={12}>
              <Grid container justifyContent="center" alignItems="center" spacing={3}>
                <Grid item sm={6} xs={12}>
                  <ControlledTextInput
                    control={control}
                    name="phoneNumber"
                    variant="outlined"
                    lightBg
                    label="Phone Number"
                    labelWidth={100}
                    defaultValue={selectedAddress && selectedAddress.phoneNumber}
                    error={errors.phoneNumber}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="center" alignItems="center" spacing={3}>
                <Grid item sm={6} xs={12}>
                  <ControlledPicker
                    control={control}
                    name="state"
                    variant="outlined"
                    lightBg
                    label="State"
                    options={stateOptions}
                    defaultValue={selectedAddress && selectedAddress.state}
                    error={errors.state}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
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
