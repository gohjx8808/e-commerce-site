import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import ControlledDatePicker from '../../../sharedComponents/inputs/views/ControlledDatePicker';
import ControlledPicker from '../../../sharedComponents/inputs/views/ControlledPicker';
import ControlledTextInput from '../../../sharedComponents/inputs/views/ControlledTextInput';
import { submitEditAccDetailsAction, toggleEditAccDetailModal } from '../src/accountReducer';
import { editAccountSchema } from '../src/accountScheme';
import accountStyles from '../src/accountStyles';

const EditAccDetailModal = () => {
  const styles = accountStyles();
  const dispatch = useAppDispatch();
  const isEditAccDetailModalOpen = useAppSelector(
    (state) => state.account.isEditAccDetailModalDisplay,
  );
  const currentUserDetails = useAppSelector((state) => state.auth.currentUser);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(editAccountSchema),
  });

  const closeModal = () => {
    dispatch(toggleEditAccDetailModal(false));
  };

  const genderOptions = [{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }];

  const onEditSubmit = (hookData:account.rawSubmitEditAccDetailPayload) => {
    const processedPayload:account.submitEditAccDetailPayload = {
      ...hookData, gender: hookData.gender.value,
    };
    dispatch(submitEditAccDetailsAction(processedPayload));
  };

  return (
    <Dialog
      open={isEditAccDetailModalOpen}
      onClose={closeModal}
      aria-labelledby="editAccDetail"
      fullWidth
      maxWidth="md"
    >
      <Grid container justifyContent="center">
        <DialogTitle id="editAccDetail">Edit Account Details</DialogTitle>
      </Grid>
      <form onSubmit={handleSubmit(onEditSubmit)}>
        <DialogContent>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <ControlledTextInput
                control={control}
                name="fullName"
                variant="outlined"
                lightbg={1}
                label="Full Name"
                labelWidth={68}
                defaultinput={currentUserDetails.fullName}
                startAdornment={<InputAdornment position="start"><PersonIcon /></InputAdornment>}
                formerror={errors.fullName}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="email"
                variant="outlined"
                lightbg={1}
                label="Email"
                labelWidth={40}
                defaultinput={currentUserDetails.email}
                startAdornment={<InputAdornment position="start"><EmailIcon /></InputAdornment>}
                formerror={errors.email}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="phoneNumber"
                variant="outlined"
                lightbg={1}
                label="Phone Number"
                labelWidth={100}
                defaultinput={currentUserDetails.phoneNumber}
                startAdornment={<InputAdornment position="start"><PhoneIcon /></InputAdornment>}
                formerror={errors.phoneNumber}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledPicker
                control={control}
                name="gender"
                variant="outlined"
                lightbg={1}
                label="Gender"
                options={genderOptions}
                defaultValue={genderOptions.find(
                  (gender) => gender.value === currentUserDetails.gender,
                )}
                error={errors.gender}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledDatePicker
                control={control}
                name="dob"
                inputVariant="outlined"
                lightbg={1}
                label="Date of Birth"
                defaultdate={currentUserDetails.dob}
                formerror={errors.dob}
              />
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
      </form>
    </Dialog>
  );
};

export default EditAccDetailModal;
