import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import StyledListItem from "../../../styledComponents/StyledListItem";
import { useUserDetails } from "../../auth/src/authMutations";

interface CheckoutAddressListModalOwnProps {
  isVisible: boolean;
  toggleModal: () => void;
  selectedAddress?: auth.addressData | null;
  updateSelectedAddress: (address: auth.addressData | null) => void;
}

const CheckoutAddressListModal = (props: CheckoutAddressListModalOwnProps) => {
  const { isVisible, toggleModal, selectedAddress, updateSelectedAddress } =
    props;
  const { data: userDetails } = useUserDetails();
  const addressList = useMemo(
    () => userDetails?.addressBook,
    [userDetails?.addressBook]
  );

  return (
    <Dialog
      onClose={toggleModal}
      aria-labelledby="addressBook"
      open={isVisible}
      fullWidth
    >
      <DialogTitle id="addressBook">
        <Grid container justifyContent="space-between">
          <Typography variant="h4">Address Book</Typography>
          {selectedAddress && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => updateSelectedAddress(null)}
            >
              Clear selection
            </Button>
          )}
        </Grid>
      </DialogTitle>
      {addressList ? (
        <List>
          {addressList.map((address) => (
            <StyledListItem
              selected={address === selectedAddress}
              onClick={() => updateSelectedAddress(address)}
              key={address.addressLine1}
            >
              <ListItemText
                primary={
                  <>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography fontWeight="bold">
                          {address.fullName}
                        </Typography>
                      </Grid>
                      <Divider
                        orientation="vertical"
                        flexItem
                        variant="middle"
                      />
                      <Grid item xs={5}>
                        <Typography fontWeight="bold">
                          {address.phoneNumber}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography fontWeight="bold">{address.email}</Typography>
                    <Typography>
                      {address.addressLine1} {address.addressLine2}
                    </Typography>
                    <Typography>
                      {address.postcode} {address.city}
                    </Typography>
                    <Typography>
                      {address.outsideMalaysiaState
                        ? address.outsideMalaysiaState
                        : address.state}
                      {", "}
                      {address.country}
                    </Typography>
                  </>
                }
              />
            </StyledListItem>
          ))}
        </List>
      ) : (
        <Grid container justifyContent="center" marginBottom={3}>
          <Typography variant="h6">No address is added yet!</Typography>
        </Grid>
      )}
    </Dialog>
  );
};

CheckoutAddressListModal.defaultProps = {
  selectedAddress: null,
};

export default CheckoutAddressListModal;
