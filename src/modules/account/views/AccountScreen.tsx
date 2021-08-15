import { makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import React from 'react';
import AccountDetails from './AccountDetails';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  desktopSideTab: {
    width: '15%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    display: 'flex',
  },
  smallerViewTabs: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    display: 'flex',
  },
}));

export default function AccountScreen() {
  const styles = useStyles();
  const [value, setValue] = React.useState('accDetails');

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={styles.root}>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="account tabs" orientation="vertical" className={styles.desktopSideTab}>
          <Tab label="Account Details" value="accDetails" />
          <Tab label="Address Book" value="addressBook" />
        </TabList>
        <TabList onChange={handleChange} aria-label="account tabs" variant="scrollable" className={styles.smallerViewTabs}>
          <Tab label="Account Details" value="accDetails" />
          <Tab label="Address Book" value="addressBook" />
        </TabList>
        <TabPanel value="accDetails">
          <AccountDetails />
        </TabPanel>
        <TabPanel value="addressBook">Item Two</TabPanel>
      </TabContext>
    </div>
  );
}
