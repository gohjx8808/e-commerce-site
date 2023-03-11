import { useAddressList } from "@modules/address/src/addressQueries";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import StyledListItem from "../../../styledComponents/StyledListItem";

interface CheckoutAddressListModalOwnProps {
  isVisible: boolean;
  toggleModal: () => void;
  selectedAddress?: address.addressData | null;
  updateSelectedAddress: (address: address.addressData | null) => void;
}

const CheckoutAddressListModal = (props: CheckoutAddressListModalOwnProps) => {
  const { isVisible, toggleModal, selectedAddress, updateSelectedAddress } =
    props;
  const { data: addressList } = useAddressList();

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
              key={address.addressLineOne}
            >
              <ListItemText
                primary={
                  <>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography fontWeight="bold">
                          {address.receiverName}
                        </Typography>
                      </Grid>
                      <Divider
                        orientation="vertical"
                        flexItem
                        variant="middle"
                      />
                      <Grid item xs={5}>
                        <Typography fontWeight="bold">
                          {address.receiverCountryCode}{" "}
                          {address.receiverPhoneNumber}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography>
                      {address.addressLineOne} {address.addressLineTwo}
                    </Typography>
                    <Typography>
                      {address.postcode} {address.city}
                    </Typography>
                    <Typography>
                      {address.state.name}
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
