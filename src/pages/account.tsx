import SEO from "@modules/SEO";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import { TabsActions } from "@mui/material/Tabs";
import { generateHeader } from "@utils/helper";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import AccountDetails from "../modules/account/views/AccountDetails";
import AddressBook from "../modules/address/views/AddressBook";
import CustomBreadcrumbs from "../sharedComponents/CustomBreadcrumbs";

const Account = () => {
  const [value, setValue] = useState("accDetails");

  const handleChange = (_event: ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const mobileTabRef = useRef<TabsActions>(null);

  useEffect(() => {
    setTimeout(() => {
      mobileTabRef.current?.updateIndicator();
    }, 100);
  });

  return (
    <MainLayout>
      <Grid item xs={12}>
        <Grid item md={10} xs={12}>
          <Grid container justifyContent="flex-start" alignItems="center">
            <CustomBreadcrumbs />
          </Grid>
        </Grid>
        <Box border="1px solid #d3d4d5" borderRadius={1}>
          <TabContext value={value}>
            <TabList
              textColor="secondary"
              indicatorColor="secondary"
              action={mobileTabRef}
              onChange={handleChange}
              aria-label="account tabs"
              variant="scrollable"
            >
              <Tab label="Account Details" value="accDetails" />
              <Tab label="Address Book" value="addressBook" />
            </TabList>
            <TabPanel value="accDetails">
              <AccountDetails />
            </TabPanel>
            <TabPanel value="addressBook">
              <AddressBook />
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </MainLayout>
  );
};

export default Account;

export const Head = () => <SEO title={generateHeader("My Account")} />;
