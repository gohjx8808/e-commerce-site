import { ProductContext } from "@contextProvider/ProductContextProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import useDebounce from "@hooks/useDebounce";
import SEO from "@modules/SEO";
import { useAccountDetails } from "@modules/account/src/accountQueries";
import {
  useAddressList,
  useStateOptions,
} from "@modules/address/src/addressQueries";
import {
  useCalculateShippingFee,
  useCheckout,
  useVerifyPromoCode,
} from "@modules/products/src/productMutations";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
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
import { useCallback, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useIsLoggedIn, useXsDownMediaQuery } from "../../hooks";
import MainLayout from "../../layouts/MainLayout";
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

const Checkout = () => {
  const isXsView = useXsDownMediaQuery();
  const [selectedAddress, setSelectedAddress] =
    useState<address.addressData | null>();

  const { data: addressList } = useAddressList();

  const { shoppingCart, selectedCheckoutItem } = useContext(ProductContext);

  const isLoggedIn = useIsLoggedIn();

  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [checkoutProduct, setCheckoutProduct] = useState<
    products.checkoutProduct[]
  >([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [shippingFee, setShippingFee] = useState<products.shippingFeeData>({
    shippingFee: 0,
    valid: false,
  });
  const [isCheckoutAddressListModalOpen, setIsCheckoutAddressListModalOpen] =
    useState(false);
  const [promoCodeApplied, setPromoCodeApplied] = useState<
    products.promoCodeData | undefined
  >(undefined);

  const [promoCodeError, setPromoCodeError] = useState<string>("");

  const { data: stateOptions } = useStateOptions();

  const { data: userDetails } = useAccountDetails();

  const { mutate: verifyPromoCode, isLoading: verifyPromoCodeLoading } =
    useVerifyPromoCode(setPromoCodeApplied, setPromoCodeError);

  const {
    mutate: calculateShippingFee,
    isLoading: calculateShippingFeeLoading,
  } = useCalculateShippingFee(setShippingFee);

  const { mutate: checkout, isLoading: checkoutLoading } = useCheckout();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(productSchema.shippingInfoSchema),
  });

  useEffect(() => {
    const filteredItems = shoppingCart.filter((item) => {
      if (selectedCheckoutItem.includes(item.productId)) {
        const itemPrice = +item.pricePerItem * +item.quantity;
        // eslint-disable-next-line no-param-reassign
        item = { ...item, totalPrice: roundTo2Dp(itemPrice) };
        setTotalAmount((prevTotalAmount) => prevTotalAmount + itemPrice);
        return true;
      }
      return false;
    });
    setCheckoutProduct(filteredItems);
  }, [shoppingCart, selectedCheckoutItem]);

  useEffect(() => {
    if (isLoggedIn && addressList) {
      const defaultAddress = addressList?.find((address) => address.isDefault);
      setSelectedAddress(defaultAddress);
    }
  }, [addressList, isLoggedIn]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: ExpandedCell,
    },
    {
      field: "pricePerItem",
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
      field: "totalPrice",
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
      field: "totalPrice",
      headerName: "Total Price",
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];

  const inputPromoCode = watch("promoCode");
  const stateSelected = watch("state");

  const onCalculateShippingFee = useCallback(
    (state: numberOptionsData) => {
      calculateShippingFee({ state, totalAmount });
    },
    [calculateShippingFee, totalAmount]
  );

  useEffect(() => {
    if (stateSelected?.id) {
      onCalculateShippingFee(stateSelected);
    } else {
      setShippingFee({ shippingFee: 0, valid: false });
    }
  }, [onCalculateShippingFee, stateSelected]);

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
        promoCode: watch("promoCode"),
        note: watch("note"),
        paymentMethod: watch("paymentMethod"),
        country: "Malaysia",
        addToAddressBook: watch("addToAddressBook"),
      });
    } else {
      reset({
        buyerEmail: "",
        receiverName: "",
        receiverCountryCode: 60,
        receiverPhoneNumber: undefined,
        addressLineOne: "",
        addressLineTwo: "",
        postcode: "",
        city: "",
        state: { id: 0, name: "" },
        promoCode: watch("promoCode"),
        note: watch("note"),
        paymentMethod: watch("paymentMethod"),
        country: "Malaysia",
        addToAddressBook: watch("addToAddressBook"),
      });
    }
  }, [
    reset,
    selectedAddress,
    userDetails?.email,
    isLoggedIn,
    promoCodeApplied,
    watch,
  ]);

  const onVerifyPromoCode = () => {
    if (inputPromoCode) {
      verifyPromoCode({ promoCode: inputPromoCode });
    }
  };

  useDebounce(inputPromoCode || "", onVerifyPromoCode);

  const proceedToPayment: SubmitHandler<products.checkoutFormPayload> = async (
    hookData
  ) => {
    const checkoutData: products.checkoutPayload = {
      ...hookData,
      addressId: selectedAddress?.id,
      totalAmount,
      shippingFee: shippingFee.shippingFee,
      products: checkoutProduct,
      promoCodeUsed: promoCodeApplied,
      addToAddressBook: hookData.addToAddressBook || false,
    };

    checkout(checkoutData);
  };

  const toggleCheckoutAddressListModal = () => {
    setIsCheckoutAddressListModalOpen(!isCheckoutAddressListModalOpen);
  };

  const updateSelectedAddress = (address: address.addressData | null) => {
    setSelectedAddress(address);
    toggleCheckoutAddressListModal();
  };

  const formatShippingFee = () => {
    if (shippingFee.valid) {
      if (shippingFee.shippingFee === 0) {
        return "Free";
      }
      return formatPrice(shippingFee.shippingFee, "MYR");
    }
    return "-";
  };

  const getPromoValue = () => {
    if (promoCodeApplied) {
      if (promoCodeApplied.promoType === "value") {
        return promoCodeApplied.promoValue;
      }
      return totalAmount * (promoCodeApplied.promoValue / 100);
    }
    return 0;
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
              <DataGrid<products.checkoutProduct>
                getRowId={(row) => row.productId}
                rows={checkoutProduct}
                columns={isXsView ? xsColumns : columns}
                disableColumnMenu
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 20]}
                pagination
                disableRowSelectionOnClick
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
                    color={promoCodeApplied ? "green" : ""}
                  >
                    {`Total Discount ${
                      promoCodeApplied?.name
                        ? `(${
                            promoCodeApplied.promoType === "value"
                              ? formatPrice(promoCodeApplied.promoValue, "MYR")
                              : promoCodeApplied.promoValue
                          }${
                            promoCodeApplied.promoType === "percentage"
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
                  {verifyPromoCodeLoading ? (
                    <CircularProgress size={25} color="secondary" />
                  ) : (
                    <Typography
                      variant="subtitle1"
                      textAlign="right"
                      color={promoCodeApplied ? "green" : ""}
                    >
                      -{" "}
                      {getPromoValue() === 0
                        ? ""
                        : formatPrice(getPromoValue(), "MYR")}
                    </Typography>
                  )}
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
                  {calculateShippingFeeLoading ? (
                    <CircularProgress color="secondary" size={20} />
                  ) : (
                    <Typography variant="subtitle1" textAlign="right">
                      {formatShippingFee()}
                    </Typography>
                  )}
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
                    {!shippingFee.valid
                      ? "-"
                      : formatPrice(
                          totalAmount -
                            +getPromoValue() +
                            shippingFee.shippingFee,
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
                        lightBg
                        formerror={errors.receiverName}
                        readOnly={!!selectedAddress}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <ControlledTextInput
                        control={control}
                        name="buyerEmail"
                        label="Buyer Email Address"
                        lightBg
                        isCapitalize={false}
                        formerror={errors.buyerEmail}
                        readOnly={!!selectedAddress}
                      />
                    </Grid>
                    <ControlledCountryCodePhoneInput
                      control={control}
                      countryCodeFormError={errors.receiverCountryCode}
                      phoneNumberFormError={errors.receiverPhoneNumber}
                      defaultCountryCode="60"
                      countryCodeName="receiverCountryCode"
                      phoneNumberName="receiverPhoneNumber"
                      lightBg
                      readOnly={!!selectedAddress}
                    />
                    <Grid item xs={12}>
                      <ControlledTextInput
                        control={control}
                        name="addressLineOne"
                        label="Address Line 1"
                        lightBg
                        formerror={errors.addressLineOne}
                        readOnly={!!selectedAddress}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledTextInput
                        control={control}
                        name="addressLineTwo"
                        label="Address Line 2"
                        lightBg
                        readOnly={!!selectedAddress}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <ControlledTextInput
                        control={control}
                        name="postcode"
                        label="Postcode"
                        lightBg
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
                        lightBg
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
                          lightBg
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
                        lightBg
                        formerror={errors.country}
                        readOnly
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledTextInput
                        control={control}
                        name="promoCode"
                        label="Promo Code"
                        formerror={errors.promoCode}
                        lightBg
                        disabled={!isLoggedIn}
                        isCapitalize={false}
                      />
                      <FormHelperText error sx={{ marginLeft: 2 }}>
                        {promoCodeError}
                      </FormHelperText>
                      {promoCodeApplied && (
                        <FormHelperText sx={{ marginLeft: 2, color: "green" }}>
                          Promo successfully applied!
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
                        lightBg
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
                      loading={checkoutLoading}
                      disabled={!shippingFee.valid}
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
