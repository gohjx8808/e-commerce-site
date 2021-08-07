import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { Email, Person, Phone } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import ControlledDatePicker from '../../../sharedComponents/ControlledDatePicker';
import ControlledPicker from '../../../sharedComponents/ControlledPicker';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import { toggleEditAccDetailModal } from '../src/accountReducer';
import accountStyles from '../src/accountStyles';

const EditAccDetailModal = () => {
  const styles = accountStyles();
  const dispatch = useAppDispatch();
  const isEditAccDetailModalOpen = useAppSelector(
    (state) => state.account.isEditAccDetailModalDisplay,
  );
  const currentUserDetails = useAppSelector((state) => state.auth.currentUser);

  const { control } = useForm();

  const closeModal = () => {
    dispatch(toggleEditAccDetailModal(false));
  };

  const genderOptions = [{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }];

  return (
    <Dialog
      open={isEditAccDetailModalOpen}
      onClose={closeModal}
      aria-labelledby="editAccDetail"
      fullWidth
      maxWidth="md"
    >
      <Grid container justifyContent="center">
        <DialogTitle id="editAccDetail">Edit Account Detail</DialogTitle>
      </Grid>
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
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <ControlledTextInput
                  control={control}
                  name="phoneNo"
                  variant="outlined"
                  lightBg
                  label="Phone Number"
                  labelWidth={100}
                  customClassName={styles.inputFullWidth}
                  defaultValue={currentUserDetails.phoneNumber}
                  startAdornment={<Phone />}
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
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={styles.editAccDetailActionBtnContainer}>
        <Button onClick={closeModal} color="secondary" variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAccDetailModal;
