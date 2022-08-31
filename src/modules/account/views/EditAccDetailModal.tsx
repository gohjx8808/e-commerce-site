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
import ControlledCountryCodePicker from "@sharedComponents/inputs/ControlledCountryCodePicker";
import { useForm } from "react-hook-form";
import ControlledDatePicker from "../../../sharedComponents/inputs/ControlledDatePicker";
import ControlledPicker from "../../../sharedComponents/inputs/ControlledPicker";
import ControlledTextInput from "../../../sharedComponents/inputs/ControlledTextInput";
import DialogActionButtonsContainer from "../../../styledComponents/DialogActionButtonsContainer";
import {
  useAccountDetails,
  useAccountOptions,
  useGetEditDetails,
  useUpdateAccDetails,
} from "../src/accountQueries";
import { editAccountSchema } from "../src/accountScheme";

interface editAccDetailModalProps extends DialogProps {
  toggleModal: () => void;
}

const EditAccDetailModal = (props: editAccDetailModalProps) => {
  const { toggleModal, ...dialogProps } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<account.updateAccDetailsFormData>({
    resolver: yupResolver(editAccountSchema),
  });

  const { data: accountOptions } = useAccountOptions();

  const { data: editDetails } = useGetEditDetails();

  const { refetch } = useAccountDetails();

  const {
    mutate: submitUpdateAccDetails,
    isLoading: submitUpdateAccDetailsLoading,
  } = useUpdateAccDetails(toggleModal, refetch);

  const onSubmit = (hookData: account.updateAccDetailsFormData) => {
    submitUpdateAccDetails({
      ...hookData,
      countryCodeId: hookData.countryCode.id,
      gender: hookData.gender.value,
    });
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
                defaultinput={editDetails?.name}
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                }
                formerror={errors.name}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                disabled
                name="email"
                lightbg={1}
                label="Email"
                defaultinput={editDetails?.email}
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
                name="phoneNo"
                lightbg={1}
                label="Phone Number"
                type="tel"
                defaultinput={editDetails?.phoneNo}
                startAdornment={
                  <>
                    <InputAdornment position="start">
                      <PhoneIphoneIcon />
                    </InputAdornment>
                    <InputAdornment position="start" style={{ width: 250 }}>
                      <ControlledCountryCodePicker
                        control={control}
                        lightbg={1}
                        name="countryCode"
                        error={errors.countryCode?.id}
                        options={accountOptions?.countryCodes || []}
                      />
                    </InputAdornment>
                  </>
                }
                formerror={errors.phoneNo}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledPicker
                control={control}
                name="gender"
                lightbg={1}
                label="Gender"
                options={accountOptions?.genders || []}
                defaultcheck={editDetails?.gender}
                error={errors.gender?.value}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledDatePicker
                control={control}
                name="dob"
                lightbg={1}
                label="Date of Birth"
                defaultdate={editDetails?.dob}
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
