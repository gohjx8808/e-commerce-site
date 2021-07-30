import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import {
  DataGrid, GridColDef, GridPageChangeParams, GridValueGetterParams,
} from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../hooks';
import ControlledCheckbox from '../../../sharedComponents/ControlledCheckbox';
import ControlledPicker from '../../../sharedComponents/ControlledPicker';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import CustomBreadcrumbs from '../../../sharedComponents/CustomBreadcrumbs';
import ExpandedCell from '../../../sharedComponents/ExpandedCell';
import { formatPrice } from '../../../utils/helper';
import productSchema from '../src/productSchema';
import productStyle from '../src/productStyle';

const Checkout = () => {
  const styles = productStyle();
  const cartItems = useAppSelector((state) => state.product.shoppingCartItem);
  const selectedCheckoutItemsID = useAppSelector((state) => state.product.selectedCheckoutItemsID);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [extractedCartItem, setExtractedCartItem] = useState<products.shoppingCartItemData[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [shippingFee, setShippingFee] = useState<number>(0);
  const {
    control, watch, setValue, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema.shippingInfoSchema),
  });

  useEffect(() => {
    const filteredItems = cartItems.filter((item) => {
      if (selectedCheckoutItemsID.includes(item.id)) {
        const itemPrice = +item.price * +item.quantity;
        setTotalAmount((prevTotalAmount) => prevTotalAmount + itemPrice);
        return true;
      }
      return false;
    });
    setExtractedCartItem(filteredItems);
  }, [cartItems, selectedCheckoutItemsID]);

  const columns: GridColDef[] = [
    {
      field: 'name', headerName: 'Name', flex: 1, renderCell: ExpandedCell,
    },
    {
      field: 'price', headerName: 'Price per Unit', flex: 1, align: 'center', headerAlign: 'center', sortable: false,
    },
    {
      field: 'quantity', headerName: 'Quantity', flex: 1, align: 'center', headerAlign: 'center', sortable: false,
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      sortable: false,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${(+params.getValue(params.id, 'price')! * +params.getValue(params.id, 'quantity')!).toFixed(2)}`,
    },
  ];

  const stateOptions = [
    { value: 'Johor', label: 'Johor' },
    { value: 'Kedah', label: 'Kedah' },
    { value: 'Kelantan', label: 'Kelantan' },
    { value: 'Kuala Lumpur', label: 'Kuala Lumpur' },
    { value: 'Labuan', label: 'Labuan' },
    { value: 'Melaka', label: 'Melaka' },
    { value: 'Negeri Sembilan', label: 'Negeri Sembilan' },
    { value: 'Pahang', label: 'Pahang' },
    { value: 'Perak', label: 'Perak' },
    { value: 'Perlis', label: 'Perlis' },
    { value: 'Pulau Pinang', label: 'Pulau Pinang' },
    { value: 'Putrajaya', label: 'Putrajaya' },
    { value: 'Sabah', label: 'Sabah' },
    { value: 'Sarawak', label: 'Sarawak' },
    { value: 'Selangor', label: 'Selangor' },
    { value: 'Terengganu', label: 'Terengganu' },
    { value: 'Outside Malaysia', label: 'Outside Malaysia' },
  ];

  const handlePageSizeChange = (params: GridPageChangeParams) => {
    setPageSize(params.pageSize);
  };

  const selectedState = watch('state');

  useEffect(() => {
    if (selectedState && selectedState.value !== 'Outside Malaysia') {
      setValue('country', 'Malaysia');
    } else {
      setValue('country', '');
    }
  }, [setValue, selectedState]);

  const outsideMalaysiaState = selectedState && selectedState.value === 'Outside Malaysia';

  useEffect(() => {
    const eastMalaysia = selectedState && (selectedState.value === 'Sabah' || selectedState.value === 'Sarawak');
    if (selectedState) {
      if (eastMalaysia) {
        setShippingFee(14);
      } else {
        setShippingFee(7);
      }
    } else {
      setShippingFee(0);
    }
  }, [selectedState]);

  const proceedToPayment = async (hookData:products.submitShippingInfoPayload) => {
    const response = await window.fetch('/api/sendGrid', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(hookData),
    }).then((rawRes) => rawRes.json());
  };

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs={11} lg={12}>
        <CustomBreadcrumbs />
      </Grid>
      <Grid item lg={4} xs={11}>
        <Typography variant="h6">Your Order</Typography>
        <Card className={`${styles.secondaryBorder} ${styles.checkoutOrderCard}`} variant="outlined">
          <Box className={styles.checkoutItemContainer}>
            <DataGrid
              rows={extractedCartItem}
              columns={columns}
              disableColumnMenu
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
              disableSelectionOnClick
              hideFooter
            />
          </Box>
          <Divider />
          <Grid container justify="flex-end" className={styles.totalPayTextContainer}>
            <Grid container>
              <Typography variant="subtitle1" className={`${styles.totalPayText} ${styles.checkListFront}`}>
                Shipping Fee:
              </Typography>
              <Typography variant="subtitle1" className={`${styles.totalPayText} ${styles.checkListBack}`}>
                {shippingFee !== 0 ? formatPrice(shippingFee, 'MYR') : '-'}
              </Typography>
            </Grid>
            <Grid container>
              <Typography variant="subtitle1" className={`${styles.totalPayText} ${styles.checkListFront}`}>
                Total Amount to Pay:
              </Typography>
              <Typography variant="subtitle1" className={`${styles.totalPayText} ${styles.checkListBack}`}>
                {formatPrice(totalAmount + shippingFee, 'MYR')}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item lg={8} xs={11}>
        <form onSubmit={handleSubmit(proceedToPayment)}>
          <Grid item xs={12}>
            <Typography variant="h6">Shipping Information</Typography>
            <Card className={styles.secondaryBorder} variant="outlined">
              <CardContent className={styles.cartTitleCardContent}>
                <Grid container justify="center" alignItems="center">
                  <ControlledTextInput
                    control={control}
                    name="fullName"
                    variant="outlined"
                    label="Full Name"
                    lightBg
                    customClassName={styles.shippingInfoFullWidth}
                    error={errors.fullName}
                  />
                  <Grid item lg={6} xs={12}>
                    <Grid container justify="center" alignItems="center">
                      <ControlledTextInput
                        control={control}
                        name="email"
                        variant="outlined"
                        label="Email Address"
                        labelWidth={105}
                        lightBg
                        customClassName={styles.shippingInfoHalfWidth}
                        error={errors.email}
                      />
                    </Grid>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Grid container justify="center" alignItems="center">
                      <ControlledTextInput
                        control={control}
                        name="phoneNo"
                        variant="outlined"
                        label="Phone Number"
                        labelWidth={105}
                        lightBg
                        customClassName={styles.shippingInfoHalfWidth}
                        startAdornment={(
                          <InputAdornment position="start">
                            +
                          </InputAdornment>
                        )}
                        defaultValue="60"
                        error={errors.phoneNo}
                      />
                    </Grid>
                  </Grid>
                  <ControlledTextInput
                    control={control}
                    name="addressLine1"
                    variant="outlined"
                    label="Address Line 1"
                    labelWidth={105}
                    lightBg
                    customClassName={styles.shippingInfoFullWidth}
                    error={errors.addressLine1}
                  />
                  <ControlledTextInput
                    control={control}
                    name="addressLine2"
                    variant="outlined"
                    label="Address Line 2"
                    labelWidth={110}
                    lightBg
                    customClassName={styles.shippingInfoFullWidth}
                  />
                  <Grid item lg={6} xs={12}>
                    <Grid container justify="center" alignItems="center">
                      <ControlledTextInput
                        control={control}
                        name="postcode"
                        variant="outlined"
                        label="Postcode"
                        lightBg
                        maxLength={10}
                        customClassName={styles.shippingInfoHalfWidth}
                        error={errors.postcode}
                      />
                    </Grid>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Grid container justify="center" alignItems="center">
                      <ControlledTextInput
                        control={control}
                        name="city"
                        variant="outlined"
                        label="City"
                        lightBg
                        labelWidth={25}
                        customClassName={styles.shippingInfoHalfWidth}
                        error={errors.city}
                      />
                    </Grid>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Grid container justify="center" alignItems="center">
                      <ControlledPicker
                        control={control}
                        options={stateOptions}
                        name="state"
                        variant="outlined"
                        lightBg
                        label="State"
                        customClassName={styles.shippingInfoHalfWidth}
                        error={errors.state}
                      />
                    </Grid>
                  </Grid>
                  {outsideMalaysiaState && (
                  <Grid item lg={6} xs={12}>
                    <Grid container justify="center" alignItems="center">
                      <ControlledTextInput
                        control={control}
                        name="outsideMalaysiaState"
                        variant="outlined"
                        label="Foreign Country State"
                        labelWidth={155}
                        lightBg
                        customClassName={styles.shippingInfoHalfWidth}
                        error={errors.outsideMalaysiaState}
                      />
                    </Grid>
                  </Grid>
                  )}
                  <Grid item lg={outsideMalaysiaState ? 12 : 6} xs={12}>
                    <Grid container justify="center" alignItems="center">
                      <ControlledTextInput
                        control={control}
                        name="country"
                        variant="outlined"
                        label="Country"
                        labelWidth={55}
                        lightBg
                        customClassName={
                      outsideMalaysiaState
                        ? styles.shippingInfoFullWidth : styles.shippingInfoHalfWidth
                      }
                        error={errors.country}
                      />
                    </Grid>
                  </Grid>
                  <Grid container justify="flex-start" alignItems="center" className={styles.rmbPadding}>
                    <ControlledCheckbox
                      name="saveShippingInfo"
                      control={control}
                      label="Use this shipping information for the next time"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="flex-end" className={styles.proceedPaymentBtnContainer}>
              <Button variant="contained" color="secondary" size="medium" type="submit">
                Proceed To Payment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Checkout;
