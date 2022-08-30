import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import WcIcon from "@mui/icons-material/Wc";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import dayjs from "dayjs";
import { useState } from "react";
import { useAccountDetails } from "../src/accountQueries";
import EditAccDetailModal from "./EditAccDetailModal";
import SingleAccData from "./SingleAccData";

const AccountDetails = () => {
  const [isEditAccDetailModalOpen, setEditAccDetailModalOpen] = useState(false);

  const toggleEditAccDetailModal = () => {
    setEditAccDetailModalOpen(!isEditAccDetailModalOpen);
  };

  const { data: accountDetails, isLoading: accountDetailsLoading } =
    useAccountDetails();

  if (!accountDetails || accountDetailsLoading) {
    return <Skeleton variant="rectangular" width="100%" height={200} />;
  }

  return (
    <Grid container justifyContent="center" alignItems="center" marginY={3}>
      <Grid item md={11} xs={12}>
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
          <SingleAccData
            label="Full Name"
            data={accountDetails.name}
            Icon={<PersonIcon />}
          />
          <SingleAccData
            label="Gender"
            data={accountDetails.gender}
            Icon={<WcIcon />}
          />
          <SingleAccData
            label="Email"
            data={accountDetails.email}
            Icon={<EmailIcon />}
          />
          <SingleAccData
            label="Phone No"
            data={accountDetails.phoneNo}
            Icon={<PhoneIphoneIcon />}
          />
          <SingleAccData
            label="Date of Birth"
            data={dayjs(accountDetails.dob).format("DD MMMM YYYY")}
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
        />
      </Grid>
    </Grid>
  );
};

export default AccountDetails;
