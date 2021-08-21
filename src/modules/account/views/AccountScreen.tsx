import { TabsActions } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
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
          <TabList action={mobileTabRef} onChange={handleChange} aria-label="account tabs" variant="scrollable">
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
