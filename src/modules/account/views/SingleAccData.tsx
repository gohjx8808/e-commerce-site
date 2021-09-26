import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

interface SingleAccDataOwnProps{
  label:string
  data:string
  Icon?:React.ReactElement
}

const SingleAccData = (props:SingleAccDataOwnProps) => {
  const { label, data, Icon } = props;

  return (
    <Grid item sm={6} xs={12}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item sm={6} xs={12}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              {Icon}
            </Grid>
            <Grid item>
              <Typography fontWeight="500">{label}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Grid container alignItems="center">
            <Typography>{data}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

SingleAccData.defaultProps = {
  Icon: null,
};

export default SingleAccData;
