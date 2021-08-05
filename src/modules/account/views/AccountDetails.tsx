import Grid from '@material-ui/core/Grid';
import React from 'react';
import CustomBreadcrumbs from '../../../sharedComponents/CustomBreadcrumbs';

const AccountDetails = () => (
  <Grid container justifyContent="center" alignItems="center">
    <Grid item xs={11}>
      <Grid container justifyContent="flex-start" alignItems="center">
        <CustomBreadcrumbs />
      </Grid>
    </Grid>
  </Grid>
);

export default AccountDetails;
