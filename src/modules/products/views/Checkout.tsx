import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  DataGrid, GridColDef, GridPageChangeParams, GridValueGetterParams,
} from '@material-ui/data-grid';
import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../hooks';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import CustomBreadcrumbs from '../../../sharedComponents/CustomBreadcrumbs';
import routeNames from '../../../utils/routeNames';
import productStyle from '../src/productStyle';

const Checkout = () => {
  const styles = productStyle();
  const cartItems = useAppSelector((state) => state.product.shoppingCartItem);
  const selectedCheckoutItemsID = useAppSelector((state) => state.product.selectedCheckoutItemsID);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [extractedCartItem, setExtractedCartItem] = useState<products.shoppingCartItemData[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const { control } = useForm();

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
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'price', headerName: 'Price per Unit', width: 200, align: 'center', headerAlign: 'center', sortable: false,
    },
    {
      field: 'quantity', headerName: 'Quantity', width: 150, align: 'center', headerAlign: 'center', sortable: false,
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      sortable: false,
      width: 150,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${(+params.getValue(params.id, 'price')! * +params.getValue(params.id, 'quantity')!).toFixed(2)}`,
    },
  ];

  const handlePageSizeChange = (params: GridPageChangeParams) => {
    setPageSize(params.pageSize);
  };

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item xs={11}>
        <Grid item xs={9}>
          <CustomBreadcrumbs />
        </Grid>
      </Grid>
      <Grid item lg={6} xs={11}>
        <Typography variant="h6">Your Order</Typography>
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
            style={{ borderColor: '#B67B5E', borderWidth: 2 }}
          />
        </Box>
        <Grid container justify="flex-end" className={styles.totalPayText}>
          <Typography variant="h6">
            Total Amount to Pay: RM
            {totalAmount.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
      <Grid item lg={6} xs={11}>
        <Card>
          <CardContent className={styles.cartTitleCardContent}>
            <ControlledTextInput
              control={control}
              name="emailAddress"
              variant="outlined"
              label="Email Address"
              labelWidth={105}
              lightBg
              customClassName={styles.checkoutInputWidth}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={10} xs={11}>
        <Grid container justify="flex-end">
          <Button variant="contained" color="secondary" size="medium" onClick={() => navigate(routeNames.checkout)}>
            Proceed To Payment
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Checkout;
