import { TabsActions } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
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
        <Tabs value={value} action={mobileTabRef} onChange={handleChange} aria-label="account tabs" variant="scrollable">
          <Tab label="Account Details" value="accDetails" />
          <Tab label="Address Book" value="addressBook" />
        </Tabs>
        <TabPanel value="accDetails" className={styles.noPaddingLeft}>
          <AccountDetails />
        </TabPanel>
        <TabPanel value="addressBook" className={styles.fullWidth}>
          <AddressBook />
        </TabPanel>
      </div>
    </Grid>
  );
}
