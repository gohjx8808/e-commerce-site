/* eslint-disable react/jsx-no-undef */
import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import ControlledCountryCodePhoneInput from "@sharedComponents/inputs/ControlledCountryCodePhoneInput";
import StyledFormControl from "@styledComponents/inputs/StyledFormControl";
import { genderOptions } from "@utils/constants";
import { useForm } from "react-hook-form";
import ControlledDatePicker from "../../../sharedComponents/inputs/ControlledDatePicker";
import ControlledPicker from "../../../sharedComponents/inputs/ControlledPicker";
import ControlledTextInput from "../../../sharedComponents/inputs/ControlledTextInput";
import DialogActionButtonsContainer from "../../../styledComponents/DialogActionButtonsContainer";
import { useAccountDetails, useUpdateAccDetails } from "../src/accountQueries";
import { editAccountSchema } from "../src/accountSchemas";

interface editAccDetailModalProps extends DialogProps {
  toggleModal: () => void;
  accountDetails: account.accDetailsData;
}

const EditAccDetailModal = (props: editAccDetailModalProps) => {
  const { toggleModal, accountDetails, ...dialogProps } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<account.updateAccDetailsFormData>({
    resolver: yupResolver(editAccountSchema),
  });

  const { refetch } = useAccountDetails();

  const {
    mutate: submitUpdateAccDetails,
    isLoading: submitUpdateAccDetailsLoading,
  } = useUpdateAccDetails(toggleModal, refetch);

  const onSubmit = (hookData: account.updateAccDetailsFormData) => {
    submitUpdateAccDetails({ ...hookData, gender: hookData.gender.value });
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
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
                name="name"
                lightbg={1}
                label="Full Name"
                defaultinput={accountDetails.name}
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                }
                formerror={errors.name}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <StyledFormControl disabled lightbg={1}>
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  value={accountDetails.email}
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  }
                />
              </StyledFormControl>
            </Grid>
            <ControlledCountryCodePhoneInput
              control={control}
              lightbg={1}
              defaultcountrycode={accountDetails.countryCode}
              defaultphonenumber={accountDetails.phoneNumber}
              countrycodeformerror={errors.countryCode}
              phonenumberformerror={errors.phoneNo}
            />
            <Grid item sm={6} xs={12}>
              <ControlledPicker
                control={control}
                name="gender"
                lightbg={1}
                label="Gender"
                options={genderOptions}
                defaultcheck={accountDetails.gender}
                error={errors.gender?.value}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledDatePicker
                control={control}
                name="dob"
                lightbg={1}
                label="Date of Birth"
                defaultdate={accountDetails.dob}
                formerror={errors.dob}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActionButtonsContainer>
          <LoadingButton
            onClick={toggleModal}
            color="secondary"
            loading={submitUpdateAccDetailsLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            color="secondary"
            variant="contained"
            type="submit"
            loading={submitUpdateAccDetailsLoading}
          >
            Submit
          </LoadingButton>
        </DialogActionButtonsContainer>
      </form>
    </Dialog>
  );
};

export default EditAccDetailModal;
