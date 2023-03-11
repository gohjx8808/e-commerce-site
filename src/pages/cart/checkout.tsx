import { ProductContext } from "@contextProvider/ProductContextProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAccountDetails } from "@modules/account/src/accountQueries";
import {
  useAddressList,
  useStateOptions,
} from "@modules/address/src/addressQueries";
import SEO from "@modules/SEO";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ControlledCountryCodePhoneInput from "@sharedComponents/inputs/ControlledCountryCodePhoneInput";
import { paymentMethods } from "@utils/constants";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useIsLoggedIn, useXsDownMediaQuery } from "../../hooks";
import MainLayout from "../../layouts/MainLayout";
import {
  useAvailablePromoCodes,
  useOrderCount,
  useSubmitOrder,
} from "../../modules/products/src/productQueries";
import productSchema from "../../modules/products/src/productSchema";
import CheckoutAddressListModal from "../../modules/products/views/CheckoutAddressListModal";
import CustomBreadcrumbs from "../../sharedComponents/CustomBreadcrumbs";
import DividerWithText from "../../sharedComponents/DividerWithText";
import ExpandedCell from "../../sharedComponents/ExpandedCell";
import ControlledCheckbox from "../../sharedComponents/inputs/ControlledCheckbox";
import ControlledPicker from "../../sharedComponents/inputs/ControlledPicker";
import ControlledRadioButton from "../../sharedComponents/inputs/ControlledRadioButton";
import ControlledTextInput from "../../sharedComponents/inputs/ControlledTextInput";
import CheckoutCard from "../../styledComponents/products/CheckoutCard";
import { formatPrice, generateHeader, roundTo2Dp } from "../../utils/helper";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

interface promoCodeObject {
  code: string;
  discountType: string;
  discountValue: string;
  error: string;
  success: string;
  discountedPrice: number;
}

interface shippingFeeData {
  realShipping: number;
  displayShipping: string;
}

const Checkout = () => {
  const isXsView = useXsDownMediaQuery();
  const [selectedAddress, setSelectedAddress] =
    useState<address.addressData | null>();

  const { data: addressList } = useAddressList();

  const {
    shoppingCart,
    selectedCheckoutItem,
    clearSelectedCheckoutItem,
    removeCartItem,
  } = useContext(ProductContext);

  const onSuccessOrder = () => {
    removeCartItem();
    clearSelectedCheckoutItem();
  };

  const { data: stateOptions } = useStateOptions();

  const { data: userDetails } = useAccountDetails();

  const { data: orderCount } = useOrderCount();
  const { mutate: submitOrder, isLoading: submitOrderLoading } =
    useSubmitOrder(onSuccessOrder);
  const { data: availablePromoCodes } = useAvailablePromoCodes();

  const isLoggedIn = useIsLoggedIn();

  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [extractedCartItem, setExtractedCartItem] = useState<
    products.shoppingCartItemData[]
  >([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [shippingFee, setShippingFee] = useState<shippingFeeData>({
    realShipping: 0,
    displayShipping: "-",
  });
  const [isCheckoutAddressListModalOpen, setIsCheckoutAddressListModalOpen] =
    useState(false);

  const defaultPromoObject: promoCodeObject = useMemo(
    () => ({
      code: "",
      error: "",
      success: "",
      discountValue: "",
      discountType: "",
      discountedPrice: totalAmount,
    }),
    [totalAmount]
  );
  const [appliedPromo, setAppliedPromo] =
    useState<promoCodeObject>(defaultPromoObject);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<products.checkoutFormPayload>({
    resolver: yupResolver(productSchema.shippingInfoSchema),
  });

  useEffect(() => {
    const filteredItems = shoppingCart.filter((item) => {
      if (selectedCheckoutItem.includes(item.id)) {
        const itemPrice = +item.price * +item.quantity;
        // eslint-disable-next-line no-param-reassign
        item = { ...item, itemPrice: roundTo2Dp(itemPrice) };
        setTotalAmount((prevTotalAmount) => prevTotalAmount + itemPrice);
        return true;
      }
      return false;
    });
    setExtractedCartItem(filteredItems);
  }, [shoppingCart, selectedCheckoutItem]);

  useEffect(() => {
    if (addressList) {
      const defaultAddress = addressList?.find((address) => address.isDefault);
      setSelectedAddress(defaultAddress);
    }
  }, [addressList]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: ExpandedCell,
    },
    {
      field: "price",
      headerName: "Price per Unit",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "itemPrice",
      headerName: "Total Price",
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];

  const xsColumns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: ExpandedCell,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "itemPrice",
      headerName: "Total Price",
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];

  const handlePageSizeChange = (tablePageSize: number) => {
    setPageSize(tablePageSize);
  };

  const inputPromoCode = watch("promoCode");

  useEffect(() => {
    if (isLoggedIn && selectedAddress) {
      reset({
        buyerEmail: userDetails?.email,
        receiverName: selectedAddress.receiverName,
        receiverCountryCode: selectedAddress.receiverCountryCode,
        receiverPhoneNumber: selectedAddress.receiverPhoneNumber,
        addressLineOne: selectedAddress.addressLineOne,
        addressLineTwo: selectedAddress.addressLineTwo,
        postcode: selectedAddress.postcode,
        city: selectedAddress.city,
        state: selectedAddress.state,
        addToAddressBook: false,
        paymentMethod: "",
        promoCode: inputPromoCode || "",
      });
    } else {
      reset({});
    }
  }, [reset, selectedAddress, inputPromoCode, userDetails?.email]);

  const validatePromoCode = useCallback(() => {
    let rawPromoObject: promoCodeObject = defaultPromoObject;
    let discountedPrice = totalAmount;
    if (true) {
      const today = dayjs();
      const targetPromoCode = availablePromoCodes?.find(
        (promoCode) => promoCode.code === inputPromoCode
      );
      if (targetPromoCode) {
        const isPromoCodeValid = today.isBetween(
          dayjs(targetPromoCode.startDate, "DD/MM/YYYY"),
          dayjs(targetPromoCode.endDate, "DD/MM/YYYY"),
          null,
          "[]"
        );
        if (isPromoCodeValid) {
          switch (targetPromoCode.discountType) {
            case "percentage": {
              discountedPrice =
                totalAmount *
                (1 - parseFloat(targetPromoCode.discountValue) / 100);
              break;
            }
            case "number": {
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
            success: "Promo code applied!",
            discountedPrice,
          };
        } else {
          rawPromoObject = {
            ...rawPromoObject,
            error: "Promo code is expired!",
          };
        }
      } else if (inputPromoCode) {
        rawPromoObject = { ...rawPromoObject, error: "Invalid promo code!" };
      }
    } else {
      rawPromoObject = {
        ...rawPromoObject,
        error: "You have exceeded the redemption limit!",
      };
    }
    setAppliedPromo(rawPromoObject);
    return rawPromoObject.error;
  }, [availablePromoCodes, inputPromoCode, totalAmount, defaultPromoObject]);

  useEffect(() => {
    validatePromoCode();
  }, [inputPromoCode, validatePromoCode]);

  const proceedToPayment: SubmitHandler<products.checkoutFormPayload> = async (
    hookData
  ) => {
    const emailData: products.sendPaymentEmailPayload = {
      ...hookData,
      state: hookData.state.value,
      accUserName: currentUserDetails?.fullName
        ? currentUserDetails.fullName
        : hookData.fullName,
      currentOrderCount: orderCount + 1,
      totalAmount,
      discountMargin: `${
        appliedPromo.code
          ? `${appliedPromo.discountType === "value" ? "RM " : ""}${
              appliedPromo.discountValue
            }${appliedPromo.discountType === "percentage" ? "%" : ""}`
          : ""
      }`,
      discount: totalAmount - appliedPromo.discountedPrice,
      discountedAmount: appliedPromo.discountedPrice + shippingFee.realShipping,
      shippingFee: shippingFee.realShipping,
      selectedCheckoutItems: extractedCartItem,
    };

    if (!validatePromoCode()) {
      submitOrder(emailData);
    }
  };

  const toggleCheckoutAddressListModal = () => {
    setIsCheckoutAddressListModalOpen(!isCheckoutAddressListModalOpen);
  };

  const updateSelectedAddress = (address: address.addressData | null) => {
    setSelectedAddress(address);
    toggleCheckoutAddressListModal();
  };

  return (
    <MainLayout>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={11} lg={12}>
          <CustomBreadcrumbs />
        </Grid>
        <Grid item lg={4} xs={11}>
          <Typography variant="h6">Your Order</Typography>
          <CheckoutCard variant="outlined">
            <Box
              height={{
                xs: 300,
                sm: 330,
                lg: 690,
              }}
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
            <Grid container alignItems="center" padding={2.5} spacing={1}>
              <Grid item lg={9} sm={10} xs={7}>
                <Grid container justifyContent="flex-end">
                  <Typography variant="subtitle1" textAlign="right">
                    Total Amount:
                  </Typography>
                </Grid>
              </Grid>
              <Grid item lg={3} sm={2} xs={5}>
                <Grid container justifyContent="flex-end">
                  <Typography variant="subtitle1" textAlign="right">
                    {formatPrice(totalAmount, "MYR")}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item lg={9} sm={10} xs={7}>
                <Grid container justifyContent="flex-end">
                  <Typography
                    variant="subtitle1"
                    textAlign="right"
                    color={appliedPromo.code && "green"}
                  >
                    {`Total Discount ${
                      appliedPromo.code
                        ? `(${
                            appliedPromo.discountType === "value" ? "RM " : ""
                          }${appliedPromo.discountValue}${
                            appliedPromo.discountType === "percentage"
                              ? "%"
                              : ""
                          })`
                        : ""
                    }:`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item lg={3} sm={2} xs={5}>
                <Grid container justifyContent="flex-end">
                  <Typography
                    variant="subtitle1"
                    textAlign="right"
                    color={appliedPromo.code && "green"}
                  >
                    -{" "}
                    {appliedPromo.code
                      ? formatPrice(
                          totalAmount - appliedPromo.discountedPrice,
                          "MYR"
                        )
                      : ""}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item lg={9} sm={10} xs={7}>
                <Grid container justifyContent="flex-end">
                  <Typography variant="subtitle1" textAlign="right">
                    Shipping Fee:
                  </Typography>
                </Grid>
              </Grid>
              <Grid item lg={3} sm={2} xs={5}>
                <Grid container justifyContent="flex-end">
                  <Typography variant="subtitle1" textAlign="right">
                    {shippingFee.displayShipping}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item lg={9} sm={10} xs={7}>
                <Grid container justifyContent="flex-end">
                  <Typography
                    variant="subtitle1"
                    textAlign="right"
                    fontWeight="bold"
                  >
                    Total Amount After Discount:
                  </Typography>
                </Grid>
              </Grid>
              <Grid item lg={3} sm={2} xs={5}>
                <Grid container justifyContent="flex-end">
                  <Typography
                    variant="subtitle1"
                    textAlign="right"
                    fontWeight="bold"
                  >
                    {formatPrice(
                      appliedPromo.discountedPrice + shippingFee.realShipping,
                      "MYR"
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CheckoutCard>
        </Grid>
        <Grid item lg={8} xs={11}>
          <form onSubmit={handleSubmit(proceedToPayment)}>
            <Grid item xs={12}>
              <Typography variant="h6">Shipping Information</Typography>
              <Card
                sx={{ borderColor: "secondary.main", borderWidth: 2 }}
                variant="outlined"
              >
                <CardContent>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    marginTop={1}
                  >
                    <Tooltip
                      title="Please login to use this feature"
                      disableHoverListener={isLoggedIn}
                    >
                      <span>
                        <Button
                          variant="outlined"
                          color="secondary"
                          disabled={!isLoggedIn}
                          onClick={toggleCheckoutAddressListModal}
                        >
                          Select address from address book
                        </Button>
                      </span>
                    </Tooltip>
                  </Grid>
                  <DividerWithText>Or</DividerWithText>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <ControlledTextInput
                        control={control}
                        name="receiverName"
                        label="Receiver Name"
                        lightbg={1}
                        formerror={errors.receiverName}
                        readOnly={!!selectedAddress}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <ControlledTextInput
                        control={control}
                        name="buyerEmail"
                        label="Buyer Email Address"
                        lightbg={1}
                        isCapitalize={false}
                        formerror={errors.buyerEmail}
                        readOnly={!!selectedAddress}
                      />
                    </Grid>
                    <ControlledCountryCodePhoneInput
                      control={control}
                      countrycodeformerror={errors.receiverCountryCode}
                      phonenumberformerror={errors.receiverPhoneNumber}
                      defaultcountrycode="60"
                      countrycodename="receiverCountryCode"
                      phonenumbername="receiverPhoneNumber"
                      lightbg={1}
                      readOnly={!!selectedAddress}
                    />
                    <Grid item xs={12}>
                      <ControlledTextInput
                        control={control}
                        name="addressLineOne"
                        label="Address Line 1"
                        lightbg={1}
                        formerror={errors.addressLineOne}
                        readOnly={!!selectedAddress}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledTextInput
                        control={control}
                        name="addressLineTwo"
                        label="Address Line 2"
                        lightbg={1}
                        readOnly={!!selectedAddress}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <ControlledTextInput
                        control={control}
                        name="postcode"
                        label="Postcode"
                        lightbg={1}
                        maxLength={10}
                        formerror={errors.postcode}
                        readOnly={!!selectedAddress}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <ControlledTextInput
                        control={control}
                        name="city"
                        label="City"
                        lightbg={1}
                        formerror={errors.city}
                        readOnly={!!selectedAddress}
                      />
                    </Grid>
                    {stateOptions && (
                      <Grid item sm={6} xs={12}>
                        <ControlledPicker
                          control={control}
                          options={stateOptions}
                          name="state"
                          lightbg={1}
                          label="State"
                          // @ts-ignore
                          error={errors.state}
                          readOnly={!!selectedAddress}
                        />
                      </Grid>
                    )}
                    <Grid item sm={6} xs={12}>
                      <ControlledTextInput
                        control={control}
                        name="country"
                        label="Country"
                        lightbg={1}
                        formerror={errors.country}
                        value="Malaysia"
                        readOnly
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledTextInput
                        control={control}
                        name="promoCode"
                        label="Promo Code"
                        formerror={errors.promoCode}
                        lightbg={1}
                        disabled={!isLoggedIn}
                      />
                      <FormHelperText error sx={{ marginLeft: 2 }}>
                        {appliedPromo.error}
                      </FormHelperText>
                      {appliedPromo.success && (
                        <FormHelperText sx={{ marginLeft: 2, color: "green" }}>
                          {appliedPromo.success}
                        </FormHelperText>
                      )}
                      {!isLoggedIn && (
                        <FormHelperText sx={{ marginLeft: 2 }}>
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
                    {isLoggedIn && !selectedAddress && (
                      <Grid
                        container
                        justifyContent="flex-start"
                        alignItems="center"
                        marginLeft={2.5}
                      >
                        <ControlledCheckbox
                          name="addToAddressBook"
                          control={control}
                          color="secondary"
                          label="Save to address book"
                        />
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                justifyContent="center"
                direction="row"
                alignItems="center"
                marginTop={1}
              >
                <Grid item xs={12} sm={9} md={8}>
                  <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <ControlledRadioButton
                      control={control}
                      name="paymentMethod"
                      label="Payment Methods"
                      options={paymentMethods}
                      error={errors.paymentMethod}
                      row={!isXsView}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={3} md={4}>
                  <Grid
                    container
                    justifyContent={{ xs: "center", sm: "flex-end" }}
                    alignItems="center"
                    marginTop={1}
                  >
                    <LoadingButton
                      variant="contained"
                      color="secondary"
                      size="medium"
                      type="submit"
                      loading={submitOrderLoading}
                    >
                      Proceed To Payment
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <CheckoutAddressListModal
          isVisible={isCheckoutAddressListModalOpen}
          toggleModal={toggleCheckoutAddressListModal}
          selectedAddress={selectedAddress}
          updateSelectedAddress={updateSelectedAddress}
        />
      </Grid>
    </MainLayout>
  );
};

export default Checkout;

export const Head = () => <SEO title={generateHeader("Checkout")} />;
