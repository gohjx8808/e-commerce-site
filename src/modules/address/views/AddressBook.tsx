import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import WorkIcon from "@mui/icons-material/Work";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import AddressChip from "../../../styledComponents/AddressChip";
import SmUpDivider from "../../../styledComponents/SmUpDivider";
import { homeColor, workColor } from "../../../utils/constants";
import { internationalPhoneNumberFormatter } from "../../../utils/helper";
import { useAddressList } from "../src/addressQueries";
import AddressModal from "./AddressModal";
import DeleteAddressConfirmationModal from "./DeleteAddressConfirmationModal";

const AddressBook = () => {
  const [addEditModalData, setAddEditModalData] =
    useState<address.addEditAddressModalData>({
      isModalOpen: false,
      actionType: "",
    });
  const [deleteModalData, setDeleteModalData] =
    useState<address.deleteAddressModalData>({
      isModalOpen: false,
    });

  const { data: addressList } = useAddressList();

  const onAddAddress = () => {
    setAddEditModalData({
      isModalOpen: true,
      actionType: "Add",
    });
  };

  const onEditAddress = (selectedAddress: address.addressData) => {
    setAddEditModalData({
      isModalOpen: true,
      actionType: "Edit",
      selectedAddress,
    });
  };

  const toggleAddEditAddressModal = () => {
    setAddEditModalData({
      isModalOpen: false,
      actionType: "",
    });
  };

  const onDeleteAddress = (selectedAddress: address.addressData) => {
    setDeleteModalData({
      selectedAddress,
      isModalOpen: true,
    });
  };

  const toggleDeleteAddressModal = () => {
    setDeleteModalData({
      isModalOpen: false,
    });
  };

  return (
    <Grid item xs={12}>
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        marginBottom={3}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="secondary"
          onClick={onAddAddress}
        >
          Add New Address
        </Button>
      </Grid>
      {addressList && addressList.length > 0 ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            {addressList.map((address) => {
              const noTag = address.isDefault && !address.tag;
              return (
                <Grid key={address.addressLineOne}>
                  <Divider />
                  <Grid item xs={12} marginTop={3}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Grid container alignItems="center">
                          <Grid item>
                            <Grid container spacing={1}>
                              <Grid item>
                                <PersonIcon />
                              </Grid>
                              <Grid item>
                                <Typography fontWeight="bold">
                                  {address.receiverName}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <SmUpDivider
                            orientation="vertical"
                            flexItem
                            variant="middle"
                          />
                          <Grid item>
                            <Grid container spacing={1}>
                              <Grid item>
                                <PhoneIphoneIcon />
                              </Grid>
                              <Grid item>
                                <Typography fontWeight="bold">
                                  {internationalPhoneNumberFormatter(
                                    address.receiverCountryCode,
                                    address.receiverPhoneNumber
                                  )}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <SmUpDivider
                            orientation="vertical"
                            flexItem
                            variant="middle"
                          />
                          {address.tag && (
                            <Grid
                              item
                              marginLeft={2}
                              display={{ xs: "none", md: "flex" }}
                            >
                              <AddressChip
                                customcolor={
                                  address.tag === "Home" ? homeColor : workColor
                                }
                                label={address.tag}
                                variant="outlined"
                                icon={
                                  address.tag === "Home" ? (
                                    <HomeIcon />
                                  ) : (
                                    <WorkIcon />
                                  )
                                }
                              />
                            </Grid>
                          )}
                          {address.isDefault && (
                            <Grid
                              item
                              marginLeft={1}
                              display={{ xs: "none", md: "block" }}
                            >
                              <AddressChip
                                customcolor="red"
                                label="Default"
                                variant="outlined"
                              />
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item display={{ xs: "none", md: "flex" }}>
                        <IconButton
                          color="secondary"
                          onClick={() => onEditAddress(address)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          onClick={() => onDeleteAddress(address)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} marginBottom={{ md: 3 }}>
                    <Grid item>
                      <HomeIcon />
                    </Grid>
                    <Grid item>
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
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    display={{ xs: "flex", md: "none" }}
                    marginBottom={{ xs: 3 }}
                    marginTop={{ xs: 1 }}
                  >
                    <Grid item>
                      <Grid container>
                        {address.tag && (
                          <Grid item>
                            <AddressChip
                              customcolor={
                                address.tag === "Home" ? homeColor : workColor
                              }
                              label={address.tag}
                              variant="outlined"
                              icon={
                                address.tag === "Home" ? (
                                  <HomeIcon />
                                ) : (
                                  <WorkIcon />
                                )
                              }
                            />
                          </Grid>
                        )}
                        {address.isDefault && (
                          <Grid item marginLeft={1}>
                            <AddressChip
                              customcolor="red"
                              label="Default"
                              variant="outlined"
                            />
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={noTag ? 12 : 5}
                      display={{ xs: "flex", md: "none" }}
                    >
                      <Grid
                        container
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <IconButton
                          color="secondary"
                          onClick={() => onEditAddress(address)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          onClick={() => onDeleteAddress(address)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="center" alignItems="center">
          <Typography>No address added yet!</Typography>
        </Grid>
      )}
      <AddressModal
        modalData={addEditModalData}
        toggleModal={toggleAddEditAddressModal}
      />
      <DeleteAddressConfirmationModal
        modalData={deleteModalData}
        toggleModal={toggleDeleteAddressModal}
      />
    </Grid>
  );
};

export default AddressBook;
