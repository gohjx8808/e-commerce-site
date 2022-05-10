import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ControlledDatePicker from "../../../sharedComponents/inputs/ControlledDatePicker";
import ControlledPicker from "../../../sharedComponents/inputs/ControlledPicker";
import ControlledTextInput from "../../../sharedComponents/inputs/ControlledTextInput";
import DialogActionButtonsContainer from "../../../styledComponents/DialogActionButtonsContainer";
import { useUserDetails } from "../../auth/src/authQueries";
import { editAccountSchema } from "../src/accountScheme";

interface editAccDetailModalProps extends DialogProps {
  toggleModal: () => void;
  onFormSubmit: SubmitHandler<account.rawSubmitEditAccDetailPayload>;
  isLoading: boolean;
}

const EditAccDetailModal = (props: editAccDetailModalProps) => {
  const { toggleModal, onFormSubmit, isLoading, ...dialogProps } = props;
  const { data: currentUserDetails } = useUserDetails();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<account.rawSubmitEditAccDetailPayload>({
    resolver: yupResolver(editAccountSchema),
  });

  const genderOptions = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
  ];

  return (
    <Dialog
      {...dialogProps}
      aria-labelledby="editAccDetail"
      fullWidth
      maxWidth="md"
    >
      <Grid container justifyContent="center">
        <DialogTitle id="editAccDetail">Edit Account Details</DialogTitle>
      </Grid>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <ControlledTextInput
                control={control}
                name="fullName"
                lightbg={1}
                label="Full Name"
                defaultinput={currentUserDetails?.fullName}
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                }
                formerror={errors.fullName}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                disabled
                name="email"
                lightbg={1}
                label="Email"
                defaultinput={currentUserDetails?.email}
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                }
                formerror={errors.email}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="phoneNumber"
                lightbg={1}
                label="Phone Number"
                defaultinput={currentUserDetails?.phoneNumber}
                startAdornment={
                  <InputAdornment position="start">
                    <PhoneIphoneIcon />
                  </InputAdornment>
                }
                formerror={errors.phoneNumber}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledPicker
                control={control}
                name="gender"
                lightbg={1}
                label="Gender"
                options={genderOptions}
                defaultcheck={currentUserDetails?.gender}
                error={errors.gender?.value}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledDatePicker
                control={control}
                name="dob"
                lightbg={1}
                label="Date of Birth"
                defaultdate={currentUserDetails?.dob}
                formerror={errors.dob}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActionButtonsContainer>
          <LoadingButton
            onClick={toggleModal}
            color="secondary"
            loading={isLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            color="secondary"
            variant="contained"
            type="submit"
            loading={isLoading}
          >
            Submit
          </LoadingButton>
        </DialogActionButtonsContainer>
      </form>
    </Dialog>
  );
};

export default EditAccDetailModal;
