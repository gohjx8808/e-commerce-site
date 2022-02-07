import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import BoldItalicFont from '../styledComponents/BoldItalicFont';
import StyledTitle from '../styledComponents/StyledTitle';

const LearnMore = () => (
  <MainLayout>
    <Grid container justifyContent="center" alignItems="center" marginY={10}>
      <Grid item xs={11}>
        <Typography variant="h5" fontWeight="bold" marginBottom={3}>Welcome!</Typography>
        <Typography variant="h6" textAlign="justify">
          Thank you for visiting my site! Here are some notes for you to know before placing
          the order 😊
          {'\n\n'}
        </Typography>
        <Typography variant="h6" textAlign="justify">
          Please kindly be noted that all the handmade products are
          <BoldItalicFont>
            &quot;made to order&quot;
          </BoldItalicFont>
          . Thus, please allow 1 to 2 weeks processing days before the shipment being made. Large
          products like hats or bags might required longer period (about 1-2 months) if yarn
          restocking is needed. Please kindly confirm with the seller before placing the order if
          it is a rush order.
          {'\n\n'}
        </Typography>
        <Typography variant="h6" textAlign="justify">
          Since it is all handmade (with cares and love), please allow 1 to 2 cm varies with the
          dimension stated in the description box. Colour might be slightly differed from the
          image shown due to lighting and different screen projection.
        </Typography>
      </Grid>
      <Grid item xs={11} marginTop={10}>
        <StyledTitle variant="h6">About Custom Order</StyledTitle>
        <Typography variant="h6" textAlign="justify">
          Every custom order is welcomed! Please kindly drop me a DMs in Instagram
          {' '}
          <Link variant="inherit" href="https://www.instagram.com/yj_artjournal/" target="_blank" rel="noopener" color="secondary">
            @yj_artjournal
          </Link>
          {' '}
          or email me at
          {' '}
          <Link variant="inherit" href="mailto:yj.artjournal@gmail.com" target="_blank" rel="noopener" color="secondary">
            yj.artjournal@gmail.com
          </Link>
          {' '}
          for further discussion on your ideas!
        </Typography>
      </Grid>
      <Grid item xs={11} marginTop={10}>
        <StyledTitle variant="h6">About the Shipping (Malaysian only)</StyledTitle>
        <Typography variant="h6" textAlign="justify">
          All the parcels will be shipped via
          {' '}
          <BoldItalicFont>
            Pgeon Delivery
          </BoldItalicFont>
          . Tracking number will be sent to you
          through the email upon completing the order. You may track your parcel through
          {' '}
          <Link variant="inherit" href="https://www.pgeon.delivery/track-parcel" target="_blank" rel="noopener" color="secondary">
            Pgeon Delivery website
          </Link>
          .
        </Typography>
      </Grid>
      <Grid item xs={11} marginTop={10}>
        <StyledTitle variant="h6">About the Payment</StyledTitle>
        <Typography variant="h6" textAlign="justify">
          The payment options provided are
          <BoldItalicFont>
            {' '}
            TNG E-wallet
            {' '}
          </BoldItalicFont>
          and
          <BoldItalicFont>
            {' '}
            Bank Transfer
            {' '}
          </BoldItalicFont>
          . A payment instruction will be sent through email after checking out.
          Please make the payment within 24-hours, or the order will be cancelled.
          The crocheting process will only be started upon confirming the payment.
        </Typography>
      </Grid>
      <Grid item xs={11} marginTop={10}>
        <StyledTitle variant="h6">About Yarn Care</StyledTitle>
        <Typography variant="h6" textAlign="justify">
          Wash it by hand gently to avoid deformation.
          {'\n\n'}
        </Typography>
        <Typography variant="h6" textAlign="justify">
          First of all, soaked the crochet item in room temperature soapy water for about 15 - 30
          mins. Next, rinse it gently. Roll the crochet item with a towel to remove excess water
          and let it dry completely. Avoid drying under direct sunlight to prevent colour fading.
        </Typography>
      </Grid>
    </Grid>
  </MainLayout>
);

export default LearnMore;
