import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import { TabsActions } from '@mui/material/Tabs';
import React, { useEffect, useRef } from 'react';
import CustomBreadcrumbs from '../../../sharedComponents/CustomBreadcrumbs';
import accountStyles from '../src/accountStyles';
import AccountDetails from './AccountDetails';
import AddressBook from './AddressBook';

export default function AccountScreen() {
  const styles = accountStyles();
  const [value, setValue] = React.useState('accDetails');

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const mobileTabRef = useRef<TabsActions>(null);

  useEffect(() => {
    setTimeout(() => {
      mobileTabRef.current?.updateIndicator();
    }, 100);
  });

  return (
    <Grid item xs={12}>
      <Grid item md={10} xs={12}>
        <Grid container justifyContent="flex-start" alignItems="center">
          <CustomBreadcrumbs />
        </Grid>
      </Grid>
      <div className={styles.accDetailsRoot}>
        <TabContext value={value}>
          <TabList textColor="secondary" indicatorColor="secondary" action={mobileTabRef} onChange={handleChange} aria-label="account tabs" variant="scrollable">
            <Tab label="Account Details" value="accDetails" />
            <Tab label="Address Book" value="addressBook" />
          </TabList>
          <TabPanel value="accDetails" className={styles.noPaddingLeft}>
            <AccountDetails />
          </TabPanel>
          <TabPanel value="addressBook" className={styles.fullWidth}>
            <AddressBook />
          </TabPanel>
        </TabContext>
      </div>
    </Grid>
  );
}
