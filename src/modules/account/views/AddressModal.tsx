import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import { toggleAddressModal } from '../src/accountReducer';

const AddressModal = () => {
  const addressTagOptions:optionsData[] = [
    { label: 'home', value: 'home' },
    { label: 'work', value: 'work' },
  ];
  const dispatch = useAppDispatch();
  const isAddressModalOpen = useAppSelector((state) => state.account.isAddressModalOpen);
  const addressActionType = useAppSelector((state) => state.account.addressActionType);
  const { control, handleSubmit, formState: { errors } } = useForm();

  const closeModal = () => {
    dispatch(toggleAddressModal(false));
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
      {/* <form onSubmit={handleSubmit(onEditSubmit)}>
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
                customClassName={styles.inputFullWidth}
                defaultValue={currentUserDetails.fullName}
                startAdornment={<Person />}
                error={errors.fullName}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="center" alignItems="center" spacing={3}>
                <Grid item sm={6} xs={12}>
                  <ControlledTextInput
                    control={control}
                    name="email"
                    variant="outlined"
                    lightBg
                    label="Email"
                    labelWidth={40}
                    customClassName={styles.inputFullWidth}
                    defaultValue={currentUserDetails.email}
                    startAdornment={<Email />}
                    error={errors.email}
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
                    customClassName={styles.inputFullWidth}
                    defaultValue={currentUserDetails.phoneNumber}
                    startAdornment={<Phone />}
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
                    name="gender"
                    variant="outlined"
                    lightBg
                    label="Gender"
                    options={genderOptions}
                    customClassName={styles.inputFullWidth}
                    defaultValue={currentUserDetails.gender}
                    error={errors.gender}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <ControlledDatePicker
                    control={control}
                    name="dob"
                    variant="outlined"
                    lightBg
                    label="Date of Birth"
                    customClassName={styles.inputFullWidth}
                    defaultValue={currentUserDetails.dob}
                    error={errors.dob}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={styles.editAccDetailActionBtnContainer}>
          <Button onClick={closeModal} color="secondary">
            Cancel
          </Button>
          <Button color="secondary" variant="contained" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form> */}
    </Dialog>
  );
};

export default AddressModal;
