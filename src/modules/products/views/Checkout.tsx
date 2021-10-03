import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import clsx from 'clsx';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import firebase from 'gatsby-plugin-firebase';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector, useXsDownMediaQuery } from '../../../hooks';
import CustomBreadcrumbs from '../../../sharedComponents/CustomBreadcrumbs';
import DividerWithText from '../../../sharedComponents/DividerWithText';
import ExpandedCell from '../../../sharedComponents/ExpandedCell';
import ControlledCheckbox from '../../../sharedComponents/inputs/ControlledCheckbox';
import ControlledPicker from '../../../sharedComponents/inputs/ControlledPicker';
import ControlledRadioButton from '../../../sharedComponents/inputs/ControlledRadioButton';
import ControlledTextInput from '../../../sharedComponents/inputs/ControlledTextInput';
import useGlobalStyles from '../../../useGlobalStyles';
import { stateOptions } from '../../../utils/constants';
import { formatPrice } from '../../../utils/helper';
import { getAvailablePromocodes } from '../src/productApi';
import { sendPaymentEmailAction } from '../src/productReducers';
import productSchema from '../src/productSchema';
import productStyle from '../src/productStyle';
import CheckoutAddressListModal from './CheckoutAddressListModal';

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

interface promoCodeObject{
  code:string
  discountType:string
  discountValue:string
  error:string
  success:string
  discountedPrice:number
}

interface shippingFeeData{
  realShipping:number
  displayShipping:string
}

const Checkout = () => {
  const isXsView = useXsDownMediaQuery();
  const styles = productStyle();
  const globalStyles = useGlobalStyles();
  const dispatch = useAppDispatch();
  const currentUserDetails = useAppSelector((state) => state.auth.currentUser);
  const cartItems = useAppSelector((state) => state.product.shoppingCartItem);
  const selectedCheckoutItemsID = useAppSelector((state) => state.product.selectedCheckoutItemsID);
  const prevOrderCount = useAppSelector((state) => state.product.prevOrderCount);
  const prevShippingInfo = useAppSelector((state) => state.product.prevShippingInfo);
  const selectedAddress = useAppSelector((state) => state.account.selectedAddress);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [extractedCartItem, setExtractedCartItem] = useState<products.shoppingCartItemData[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [shippingFee, setShippingFee] = useState<shippingFeeData>({
    realShipping: 0,
    displayShipping: '-',
  });
  const [isCheckoutAddressListModalOpen, setIsCheckoutAddressListModalOpen] = useState(false);
  const [availablePromocodes, setAvailablePromocodes] = useState<
    products.availablePromocodeData[]
  >([]);
  const defaultPromoObject:promoCodeObject = useMemo(() => ({
    code: '',
    error: '',
    success: '',
    discountValue: '',
    discountType: '',
    discountedPrice: totalAmount,
  }), [totalAmount]);
  const [appliedPromo, setAppliedPromo] = useState<promoCodeObject>(defaultPromoObject);
  const {
    control, watch, setValue, handleSubmit, formState: { errors }, reset,
  } = useForm({
    resolver: yupResolver(productSchema.shippingInfoSchema),
  });

  useEffect(() => {
    const getAvailablePromocodesEffect = async () => {
      const promocodesResponse:firebase.database.DataSnapshot = await getAvailablePromocodes();
      setAvailablePromocodes(promocodesResponse.val());
    };
    getAvailablePromocodesEffect();
  }, []);

  useEffect(() => {
    const filteredItems = cartItems.filter((item) => {
      if (selectedCheckoutItemsID.includes(item.id)) {
        const itemPrice = +item.price * +item.quantity;
        // eslint-disable-next-line no-param-reassign
        item = { ...item, itemPrice: itemPrice.toFixed(2) };
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
      field: 'itemPrice',
      headerName: 'Total Price',
      sortable: false,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
  ];

  const xsColumns: GridColDef[] = [
    {
      field: 'name', headerName: 'Name', flex: 1, renderCell: ExpandedCell,
    },
    {
      field: 'quantity', headerName: 'Quantity', flex: 1, align: 'center', headerAlign: 'center', sortable: false,
    },
    {
      field: 'itemPrice',
      headerName: 'Total Price',
      sortable: false,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
  ];

  const paymentOptions = [
    { value: 'TNG', label: 'TNG E-Wallet' },
    { value: 'bankTransfer', label: 'Bank Transfer' },
  ];

  const handlePageSizeChange = (tablePageSize:number) => {
    setPageSize(tablePageSize);
  };

  const selectedState = watch('state');
  const outsideMalaysiaState = selectedState && selectedState.value === 'Outside Malaysia';

  useEffect(() => {
    if (!outsideMalaysiaState) {
      setValue('country', 'Malaysia');
    } else {
      setValue('country', '');
    }
  }, [setValue, outsideMalaysiaState]);

  useEffect(() => {
    const eastMalaysia = selectedState && (selectedState.value === 'Sabah' || selectedState.value === 'Sarawak' || selectedState.value === 'Labuan');
    let intShipping = 0;
    let strShipping = '-';
    if (selectedState && selectedState.value !== 'Outside Malaysia') {
      if (eastMalaysia) {
        if (totalAmount >= 150) {
          strShipping = 'Free';
        } else {
          intShipping = 14;
          strShipping = formatPrice(14, 'MYR');
        }
      } else if (totalAmount >= 80) {
        strShipping = 'Free';
      } else {
        intShipping = 7;
        strShipping = formatPrice(7, 'MYR');
      }
    }
    setShippingFee({
      realShipping: intShipping,
      displayShipping: strShipping,
    });
  }, [selectedState, totalAmount]);

  const inputPromoCode = watch('promoCode');

  useEffect(() => {
    if (currentUserDetails.uid !== '') {
      reset({
        fullName: selectedAddress.fullName,
        email: selectedAddress.email,
        phoneNumber: selectedAddress.phoneNumber ? selectedAddress.phoneNumber : '60',
        addressLine1: selectedAddress.addressLine1,
        addressLine2: selectedAddress.addressLine2,
        postcode: selectedAddress.postcode,
        city: selectedAddress.city,
        state: selectedAddress.state
          ? { label: selectedAddress.state, value: selectedAddress.state } : null,
        outsideMalaysiaState: selectedAddress.outsideMalaysiaState,
        country: selectedAddress.country,
        saveShippingInfo: false,
        paymentOptions: '',
        promoCode: inputPromoCode || '',
      });
    }
  }, [reset, selectedAddress, inputPromoCode, currentUserDetails.uid]);

  const validatePromocode = useCallback(() => {
    const isPromoCodeUsed = (currentUserDetails.usedPromocode
      && currentUserDetails.usedPromocode.includes(
        inputPromoCode,
      )) && !!currentUserDetails.usedPromocode;
    let rawPromoObject:promoCodeObject = defaultPromoObject;
    let discountedPrice = totalAmount;
    if (!isPromoCodeUsed) {
      const today = dayjs();
      const targetPromoCode = availablePromocodes.find(
        (promoCode) => promoCode.code === inputPromoCode,
      );
      if (targetPromoCode) {
        const isPromoCodeValid = today.isBetween(dayjs(targetPromoCode.startDate, 'DD/MM/YYYY'), dayjs(targetPromoCode.endDate, 'DD/MM/YYYY'), null, '[]');
        if (isPromoCodeValid) {
          switch (targetPromoCode.discountType) {
            case 'percentage': {
              discountedPrice = totalAmount * (
                1 - parseFloat(targetPromoCode.discountValue) / 100
              );
              break;
            }
            case 'number': {
              discountedPrice = totalAmount - +targetPromoCode.discountValue;
              break;
            }
            default:
          }
          rawPromoObject = {
            ...rawPromoObject,
            code: targetPromoCode.code,
            discountType: targetPromoCode.discountType,
            discountValue: targetPromoCode.discountValue,
            success: 'Promo code applied!',
            discountedPrice,
          };
        } else {
          rawPromoObject = { ...rawPromoObject, error: 'Promo code is expired!' };
        }
      } else if (inputPromoCode) {
        rawPromoObject = { ...rawPromoObject, error: 'Invalid promo code!' };
      }
    } else {
      rawPromoObject = { ...rawPromoObject, error: 'You have exceeded the redemption limit!' };
    }
    setAppliedPromo(rawPromoObject);
    return rawPromoObject.error;
  }, [
    availablePromocodes,
    currentUserDetails.usedPromocode,
    inputPromoCode,
    totalAmount,
    defaultPromoObject,
  ]);

  useEffect(() => {
    validatePromocode();
  }, [inputPromoCode, validatePromocode]);

  const proceedToPayment = async (hookData:products.checkoutFormPayload) => {
    const emailData:products.sendPaymentEmailPayload = {
      ...hookData,
      state: hookData.state.value,
      accUserName: currentUserDetails.fullName ? currentUserDetails.fullName : hookData.fullName,
      currentOrderCount: prevOrderCount + 1,
      totalAmount,
      discountMargin: `${appliedPromo.code ? `${appliedPromo.discountType === 'value' ? 'RM ' : ''}${appliedPromo.discountValue}${appliedPromo.discountType === 'percentage' ? '%' : ''}` : ''}`,
      discount: totalAmount - appliedPromo.discountedPrice,
      discountedAmount: appliedPromo.discountedPrice + shippingFee.realShipping,
      shippingFee: shippingFee.realShipping,
      selectedCheckoutItems: extractedCartItem,
    };

    if (!validatePromocode()) {
      dispatch(sendPaymentEmailAction(emailData));
    }
  };

  const toggleCheckoutAddressListModal = () => {
    setIsCheckoutAddressListModalOpen(!isCheckoutAddressListModalOpen);
  };

  return (
    <Grid container justifyContent="center" spacing={3}>
      <Grid item xs={11} lg={12}>
        <CustomBreadcrumbs />
      </Grid>
      <Grid item lg={4} xs={11}>
        <Typography variant="h6">Your Order</Typography>
        <Card
          className={clsx(styles.secondaryBorder, {
            [styles.checkoutOrderCard]: !outsideMalaysiaState,
            [styles.outsideMalaysiaCheckoutOrderCard]: outsideMalaysiaState,
          })}
          variant="outlined"
        >
          <Box className={clsx({
            [styles.checkoutItemContainer]: !outsideMalaysiaState,
            [styles.outsideMalaysiaCheckoutItemContainer]: outsideMalaysiaState,
          })}
          >
            <DataGrid
              rows={extractedCartItem}
              columns={isXsView ? xsColumns : columns}
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
          <Grid container alignItems="center" className={styles.totalPayTextContainer} spacing={1}>
            <Grid item lg={9} sm={10} xs={7}>
              <Grid container justifyContent="flex-end">
                <Typography variant="subtitle1" className={styles.rightText}>
                  Total Amount:
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={3} sm={2} xs={5}>
              <Grid container justifyContent="flex-end">
                <Typography variant="subtitle1" className={styles.rightText}>
                  {formatPrice(totalAmount, 'MYR')}
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={9} sm={10} xs={7}>
              <Grid container justifyContent="flex-end">
                <Typography variant="subtitle1" className={clsx(styles.rightText, { [styles.successText]: appliedPromo.code })}>
                  {`Total Discount ${appliedPromo.code ? `(${appliedPromo.discountType === 'value' ? 'RM ' : ''}${appliedPromo.discountValue}${appliedPromo.discountType === 'percentage' ? '%' : ''})` : ''}:`}
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={3} sm={2} xs={5}>
              <Grid container justifyContent="flex-end">
                <Typography variant="subtitle1" className={clsx(styles.rightText, { [styles.successText]: appliedPromo.code })}>
                  -
                  {' '}
                  {appliedPromo.code ? formatPrice(totalAmount - appliedPromo.discountedPrice, 'MYR') : ''}
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={9} sm={10} xs={7}>
              <Grid container justifyContent="flex-end">
                <Typography variant="subtitle1" className={styles.rightText}>
                  Shipping Fee:
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={3} sm={2} xs={5}>
              <Grid container justifyContent="flex-end">
                <Typography variant="subtitle1" className={styles.rightText}>
                  {shippingFee.displayShipping}
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={9} sm={10} xs={7}>
              <Grid container justifyContent="flex-end">
                <Typography variant="subtitle1" className={clsx(styles.rightText, globalStyles.boldText)}>
                  Total Amount After Discount:
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={3} sm={2} xs={5}>
              <Grid container justifyContent="flex-end">
                <Typography variant="subtitle1" className={clsx(styles.rightText, globalStyles.boldText)}>
                  {formatPrice(appliedPromo.discountedPrice + shippingFee.realShipping, 'MYR')}
                </Typography>
              </Grid>
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
                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                  <Tooltip title="Please login to use this feature" className={styles.proceedPaymentBtnContainer} disableHoverListener={currentUserDetails.uid !== ''}>
                    <span>
                      <Button variant="outlined" color="secondary" disabled={currentUserDetails.uid === ''} onClick={toggleCheckoutAddressListModal}>
                        Select address from address book
                      </Button>
                    </span>
                  </Tooltip>
                  <DividerWithText>Or</DividerWithText>
                  <Grid item xs={12}>
                    <ControlledTextInput
                      control={control}
                      name="fullName"
                      label="Full Name"
                      lightbg={1}
                      formerror={errors.fullName}
                      defaultinput={prevShippingInfo.fullName}
                      readOnly={!!selectedAddress.fullName}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <ControlledTextInput
                      control={control}
                      name="email"
                      label="Email Address"
                      lightbg={1}
                      formerror={errors.email}
                      defaultinput={prevShippingInfo.email}
                      readOnly={!!selectedAddress.email}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <ControlledTextInput
                      control={control}
                      name="phoneNumber"
                      label="Phone Number"
                      lightbg={1}
                      startAdornment={(
                        <InputAdornment position="start">
                          +
                        </InputAdornment>
                        )}
                      formerror={errors.phoneNumber}
                      defaultinput={prevShippingInfo.phoneNumber}
                      readOnly={!!selectedAddress.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ControlledTextInput
                      control={control}
                      name="addressLine1"
                      label="Address Line 1"
                      lightbg={1}
                      formerror={errors.addressLine1}
                      defaultinput={prevShippingInfo.addressLine1}
                      readOnly={!!selectedAddress.addressLine1}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ControlledTextInput
                      control={control}
                      name="addressLine2"
                      label="Address Line 2"
                      lightbg={1}
                      defaultinput={prevShippingInfo.addressLine2}
                      readOnly={!!selectedAddress.addressLine1}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <ControlledTextInput
                      control={control}
                      name="postcode"
                      label="Postcode"
                      lightbg={1}
                      maxLength={10}
                      formerror={errors.postcode}
                      defaultinput={prevShippingInfo.postcode}
                      readOnly={!!selectedAddress.postcode}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <ControlledTextInput
                      control={control}
                      name="city"
                      label="City"
                      lightbg={1}
                      formerror={errors.city}
                      defaultinput={prevShippingInfo.city}
                      readOnly={!!selectedAddress.city}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <ControlledPicker
                      control={control}
                      options={stateOptions}
                      name="state"
                      lightbg={1}
                      label="State"
                      error={errors.state}
                      defaultValue={stateOptions.find(
                        (state) => state.value === prevShippingInfo.state,
                      ) || null}
                      disabled={!!selectedAddress.state}
                    />
                  </Grid>
                  {outsideMalaysiaState && (
                    <Grid item lg={6} xs={12}>
                      <ControlledTextInput
                        control={control}
                        name="outsideMalaysiaState"
                        label="Foreign Country State"
                        lightbg={1}
                        formerror={errors.outsideMalaysiaState}
                        defaultinput={prevShippingInfo.outsideMalaysiaState}
                        readOnly={!!selectedAddress.outsideMalaysiaState}
                      />
                    </Grid>
                  )}
                  <Grid item lg={outsideMalaysiaState ? 12 : 6} xs={12}>
                    <ControlledTextInput
                      control={control}
                      name="country"
                      label="Country"
                      lightbg={1}
                      formerror={errors.country}
                      defaultinput={prevShippingInfo.country}
                      readOnly={!!selectedAddress.country}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ControlledTextInput
                      control={control}
                      name="promoCode"
                      label="Promo Code"
                      formerror={errors.promoCode}
                      lightbg={1}
                      disabled={currentUserDetails.uid === ''}
                    />
                    <FormHelperText error className={styles.errorPadding}>
                      {appliedPromo.error}
                    </FormHelperText>
                    {appliedPromo.success && (
                      <FormHelperText className={clsx(styles.errorPadding, styles.successText)}>
                        {appliedPromo.success}
                      </FormHelperText>
                    )}
                    {currentUserDetails.uid === '' && (
                      <FormHelperText className={styles.errorPadding}>
                        Please login to enjoy the discounts!
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <ControlledTextInput
                      control={control}
                      name="note"
                      label="Notes to seller (optional)"
                      lightbg={1}
                      multiline
                      rows={4}
                    />
                  </Grid>
                  {!selectedAddress.addressLine1 && (
                    <Grid container justifyContent="flex-start" alignItems="center" className={styles.rmbPadding}>
                      <ControlledCheckbox
                        name="saveShippingInfo"
                        control={control}
                        color="secondary"
                        label={currentUserDetails.uid === '' ? 'Use this shipping information for the next time' : 'Save to address book'}
                        defaultChecked={prevShippingInfo.saveShippingInfo}
                      />
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center" direction="row" alignItems="center" className={styles.proceedPaymentBtnContainer}>
              <Grid item xs={12} sm={9} md={8}>
                <Grid container justifyContent="flex-start" alignItems="center">
                  <ControlledRadioButton
                    control={control}
                    name="paymentOptions"
                    label="Payment Options:"
                    options={paymentOptions}
                    error={errors.paymentOptions}
                    defaultselect={prevShippingInfo.paymentOptions}
                    row={!isXsView}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} md={4}>
                <Grid container justifyContent="flex-end" alignItems="center">
                  <Button variant="contained" color="secondary" size="medium" type="submit">
                    Proceed To Payment
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <CheckoutAddressListModal
        isVisible={isCheckoutAddressListModalOpen}
        toggleModal={toggleCheckoutAddressListModal}
      />
    </Grid>
  );
};

export default Checkout;
