import { yupResolver } from "@hookform/resolvers/yup";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import ControlledCountryCodePhoneInput from "@sharedComponents/inputs/ControlledCountryCodePhoneInput";
import ControlledPicker from "@sharedComponents/inputs/ControlledPicker";
import { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ControlledRadioButton from "../../../sharedComponents/inputs/ControlledRadioButton";
import ControlledTextInput from "../../../sharedComponents/inputs/ControlledTextInput";
import ControlledToggleButton from "../../../sharedComponents/inputs/ControlledToggleButton";
import DialogActionButtonsContainer from "../../../styledComponents/DialogActionButtonsContainer";
import { booleanOptions, homeColor, workColor } from "../../../utils/constants";
import { defaultAddressData } from "../src/addressConstants";
import { useAddAddress, useUpdateAddress } from "../src/addressMutations";
import { useStateOptions } from "../src/addressQueries";
import { addressSchema } from "../src/addressSchemas";

const addressTag: toggleButtonOptionData[] = [
  {
    icon: <HomeIcon />,
    label: "Home",
    value: "Home",
    activeColor: homeColor,
  },
  {
    icon: <WorkIcon />,
    label: "Work",
    value: "Work",
    activeColor: workColor,
  },
];

interface AddressModalProps {
  modalData: address.addEditAddressModalData;
  toggleModal: () => void;
}

const AddressModal = (props: AddressModalProps) => {
  const { modalData, toggleModal } = props;
  const selectedAddress = useMemo(
    () => modalData.selectedAddress,
    [modalData.selectedAddress]
  );

  const onCloseModal = () => {
    reset(defaultAddressData);
    toggleModal();
  };

  const { data: stateOptions } = useStateOptions();

  const { mutate: submitAddAddress, isLoading: submitAddAddressLoading } =
    useAddAddress(onCloseModal);

  const { mutate: submitUpdateAddress, isLoading: submitUpdateAddressLoading } =
    useUpdateAddress(onCloseModal);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addressSchema),
  });

  const onSubmitForm: SubmitHandler<address.addAddressPayload> = (hookData) => {
    switch (modalData.actionType) {
      case "Add":
        submitAddAddress(hookData);
        break;
      case "Edit":
        submitUpdateAddress({
          ...hookData,
          addressId: selectedAddress?.id || 0,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (selectedAddress) {
      reset({
        receiverName: selectedAddress.receiverName,
        receiverCountryCode: selectedAddress.receiverCountryCode,
        receiverPhoneNumber: selectedAddress.receiverPhoneNumber,
        addressLineOne: selectedAddress.addressLineOne,
        addressLineTwo: selectedAddress.addressLineTwo,
        postcode: selectedAddress.postcode,
        city: selectedAddress.city,
        state: {
          // @ts-ignore
          id: selectedAddress.state.id,
          name: selectedAddress.state.name,
        },
        country: selectedAddress.country,
        isDefault: selectedAddress.isDefault,
        tag: selectedAddress.tag,
      });
    }
  }, [reset, selectedAddress]);

  return (
    <Dialog
      open={modalData.isModalOpen}
      onClose={onCloseModal}
      aria-labelledby="addressActionModal"
      fullWidth
      maxWidth="md"
    >
      <Grid container justifyContent="center">
        <DialogTitle id="addressActionModal">
          {modalData.actionType} Address
        </DialogTitle>
      </Grid>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <DialogContent dividers>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={6}>
              <ControlledTextInput
                control={control}
                name="receiverName"
                lightBg
                label="Receiver Name"
                formerror={errors.receiverName}
              />
            </Grid>
            <ControlledCountryCodePhoneInput
              control={control}
              countryCodeFormError={errors.receiverCountryCode}
              phoneNumberFormError={errors.receiverPhoneNumber}
              defaultCountryCode="60"
              countryCodeName="receiverCountryCode"
              phoneNumberName="receiverPhoneNumber"
              lightBg
            />
            <Grid item xs={12}>
              <ControlledTextInput
                control={control}
                name="addressLineOne"
                label="Address Line 1"
                lightBg
                formerror={errors.addressLineOne}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextInput
                control={control}
                name="addressLineTwo"
                label="Address Line 2"
                lightBg
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="postcode"
                label="Postcode"
                lightBg
                maxLength={10}
                formerror={errors.postcode}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="city"
                label="City"
                lightBg
                formerror={errors.city}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledPicker
                control={control}
                options={stateOptions || []}
                name="state"
                lightBg
                label="State"
                // @ts-ignore
                error={errors.state}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="country"
                label="Country"
                lightBg
                formerror={errors.country}
                disabled
                defaultInput="Malaysia"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledRadioButton
                options={booleanOptions}
                control={control}
                name="isDefault"
                label="Default"
                error={errors.isDefault}
                defaultSelect={false}
                row
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledToggleButton
                options={addressTag}
                control={control}
                name="tag"
                error={errors.tag}
                label="Tag"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActionButtonsContainer>
          <Button onClick={onCloseModal} color="secondary">
            Cancel
          </Button>
          <LoadingButton
            color="secondary"
            variant="contained"
            type="submit"
            loading={submitAddAddressLoading || submitUpdateAddressLoading}
          >
            Submit
          </LoadingButton>
        </DialogActionButtonsContainer>
      </form>
    </Dialog>
  );
};

export default AddressModal;
