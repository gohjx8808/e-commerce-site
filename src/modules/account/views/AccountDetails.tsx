import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import WcIcon from "@mui/icons-material/Wc";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { accountLocalStorageKeys } from "@utils/localStorageKeys";
import dayjs from "dayjs";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useUserDetails } from "../../auth/src/authQueries";
import { useEditAccDetails } from "../src/accountQueries";
import EditAccDetailModal from "./EditAccDetailModal";
import SingleAccData from "./SingleAccData";

interface stringDict {
  [key: string]: string;
}

const AccountDetails = () => {
  const [isEditAccDetailModalOpen, setEditAccDetailModalOpen] = useState(false);
  const genderMap: stringDict = { F: "Female", M: "Male" };

  const toggleEditAccDetailModal = () => {
    setEditAccDetailModalOpen(!isEditAccDetailModalOpen);
  };

  const { data: currentUserDetails, isLoading: currentUserDetailsLoading } =
    useUserDetails();

  const { mutate: submitEditAccDetail, isLoading: editAccDetailModalLoading } =
    useEditAccDetails(toggleEditAccDetailModal);

  const onEditSubmit: SubmitHandler<account.rawSubmitEditAccDetailPayload> = (
    hookData
  ) => {
    const processedPayload = {
      uid: localStorage.getItem(accountLocalStorageKeys.UID)!,
      details: { ...hookData, gender: hookData.gender.value },
    };
    submitEditAccDetail(processedPayload);
  };

  if (currentUserDetailsLoading || !currentUserDetails) {
    return <Skeleton variant="rectangular" width="100%" height={200} />;
  }

  return (
    <Grid container justifyContent="center" alignItems="center" marginY={3}>
      <Grid item md={11} xs={12}>
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
          <SingleAccData
            label="Full Name"
            data={currentUserDetails.fullName}
            Icon={<PersonIcon />}
          />
          <SingleAccData
            label="Gender"
            data={genderMap[currentUserDetails.gender]}
            Icon={<WcIcon />}
          />
          <SingleAccData
            label="Email"
            data={currentUserDetails.email}
            Icon={<EmailIcon />}
          />
          <SingleAccData
            label="Phone No"
            data={currentUserDetails.phoneNumber}
            Icon={<PhoneIphoneIcon />}
          />
          <SingleAccData
            label="Date of Birth"
            data={dayjs(currentUserDetails.dob).format("DD MMMM YYYY")}
            Icon={<CakeIcon />}
          />
          <Grid item xs={6} />
        </Grid>
        <Grid container justifyContent="flex-end" marginTop={3}>
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleEditAccDetailModal}
          >
            Edit Profile
          </Button>
        </Grid>
        <EditAccDetailModal
          open={isEditAccDetailModalOpen}
          onClose={toggleEditAccDetailModal}
          toggleModal={toggleEditAccDetailModal}
          onFormSubmit={onEditSubmit}
          isLoading={editAccDetailModalLoading}
        />
      </Grid>
    </Grid>
  );
};

export default AccountDetails;
