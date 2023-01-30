import { ProductContext } from "@contextProvider/ProductContextProvider";
import SEO from "@modules/SEO";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as GatsbyLink, navigate } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ItemRemoveConfirmationDialog from "../../modules/products/views/ItemRemoveConfirmationDialog";
import ProductErrorSnackbar from "../../modules/products/views/ProductErrorSnackbar";
import CustomBreadcrumbs from "../../sharedComponents/CustomBreadcrumbs";
import CartCard from "../../styledComponents/products/CartCard";
import CartItemGrid from "../../styledComponents/products/CartItemGrid";
import ProductImage from "../../styledComponents/products/ProductImage";
import { formatPrice, generateHeader } from "../../utils/helper";
import routeNames from "../../utils/routeNames";

type CartItemCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  [key: string]: string | undefined | number;
};

const Cart = () => {
  const cartTitle = ["Item", "Price (RM)", "Quantity", "Total (RM)"];
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [toBeRemovedItem, setToBeRemovedItem] =
    useState<products.shoppingCartItemData>({
      id: "",
      name: "",
      quantity: 0,
      price: 0,
      itemPrice: 0,
    });
  const [removeConfirmModalDisplay, setRemoveConfirmModalDisplay] =
    useState<boolean>(false);
  const [isCheckoutError, setIsCheckoutError] = useState(false);
  const {
    shoppingCart,
    modifyItemQuantity,
    selectedCheckoutItem,
    updateSelectedCheckoutItem,
  } = useContext(ProductContext);

  useEffect(() => {
    let currentTotal = 0;
    shoppingCart.map((item) => {
      if (selectedCheckoutItem.includes(item.id)) {
        currentTotal += +item.itemPrice;
      }
      return null;
    });
    setTotalAmount(currentTotal);
  }, [shoppingCart, selectedCheckoutItem]);

  const onChangeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "selectAll") {
      if (event.target.checked) {
        const allIds = [] as string[];
        shoppingCart.map((item) => {
          allIds.push(item.id);
          return null;
        });
        updateSelectedCheckoutItem(allIds);
      } else {
        updateSelectedCheckoutItem([]);
      }
    } else if (event.target.checked) {
      const prevArr = [...selectedCheckoutItem, event.target.id];
      updateSelectedCheckoutItem(prevArr);
    } else {
      const splicedArr = [...selectedCheckoutItem];
      splicedArr.splice(splicedArr.indexOf(event.target.id), 1);
      updateSelectedCheckoutItem(splicedArr);
    }
  };

  const toggleRemoveConfirmModalDisplay = () => {
    setRemoveConfirmModalDisplay(!removeConfirmModalDisplay);
  };

  const onReduceItemQuantity = (cartItem: products.shoppingCartItemData) => {
    if (cartItem.quantity - 1 === 0) {
      setToBeRemovedItem(cartItem);
      toggleRemoveConfirmModalDisplay();
    } else {
      modifyItemQuantity(cartItem.id, "reduce");
    }
  };

  const confirmItemRemove = () => {
    modifyItemQuantity(toBeRemovedItem.id, "delete");
    toggleRemoveConfirmModalDisplay();
  };

  const onIncreaseItemQuantity = (cartItemID: string) => {
    modifyItemQuantity(cartItemID, "increase");
  };

  const onCheckout = () => {
    if (selectedCheckoutItem.length > 0) {
      navigate(routeNames.checkout);
    } else {
      setIsCheckoutError(true);
    }
  };

  const determineSmWidth = (title: string) => {
    switch (title) {
      case "Item":
        return 4;
      case "Quantity":
        return 3;
      default:
        return 2;
    }
  };

  return (
    <MainLayout>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={11}>
          <CustomBreadcrumbs />
        </Grid>
        {shoppingCart.length > 0 ? (
          <>
            <Grid item xs={11}>
              <CartCard>
                <CardContent>
                  <Grid
                    container
                    justifyContent={{ sm: "center", xs: "flex-start" }}
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={1} md={2}>
                      <Grid
                        container
                        justifyContent={{ sm: "center", xs: "flex-start" }}
                        alignItems="center"
                      >
                        <Checkbox
                          color="secondary"
                          onChange={onChangeSelect}
                          indeterminate={
                            selectedCheckoutItem.length < shoppingCart.length &&
                            selectedCheckoutItem.length > 0
                          }
                          checked={selectedCheckoutItem.length > 0}
                          id="selectAll"
                          inputProps={{ "aria-label": "checkAll" }}
                        />
                        <Box display={{ xs: "flex", sm: "none" }}>
                          <Typography>Select all items</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    {cartTitle.map((title) => (
                      <Grid
                        item
                        display={{ xs: "none", sm: "flex" }}
                        sm={determineSmWidth(title)}
                        md={title === "Item" ? 4 : 2}
                        key={title}
                      >
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Typography fontWeight="bold">{title}</Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </CartCard>
            </Grid>
            <Grid item xs={11}>
              <CartCard>
                <CardContent>
                  {shoppingCart.map((cartItem, index) => (
                    <Grid key={cartItem.id}>
                      <CartItemGrid
                        container
                        display={{ xs: "none", sm: "flex" }}
                        index={index}
                      >
                        <Grid item sm={1} md={2}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Checkbox
                              checked={selectedCheckoutItem.includes(
                                cartItem.id
                              )}
                              color="secondary"
                              onChange={onChangeSelect}
                              id={cartItem.id}
                              inputProps={
                                {
                                  "aria-label": cartItem.id,
                                  "data-price": +cartItem.itemPrice,
                                } as CartItemCheckboxProps
                              }
                            />
                          </Grid>
                        </Grid>
                        <Grid item sm={4}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            direction="column"
                          >
                            <Typography>{cartItem.name}</Typography>
                            <ProductImage
                              src={cartItem.img?.url}
                              alt={cartItem.img?.filename}
                              cart
                            />
                          </Grid>
                        </Grid>
                        <Grid item sm={2}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Typography>{cartItem.price}</Typography>
                          </Grid>
                        </Grid>
                        <Grid item sm={3} md={2}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                          >
                            <IconButton
                              onClick={() => onReduceItemQuantity(cartItem)}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography>{cartItem.quantity}</Typography>
                            <IconButton
                              onClick={() =>
                                onIncreaseItemQuantity(cartItem.id)
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                        <Grid item sm={2}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Typography>{cartItem.itemPrice}</Typography>
                          </Grid>
                        </Grid>
                      </CartItemGrid>
                      <CartItemGrid
                        index={index}
                        container
                        display={{ xs: "flex", sm: "none" }}
                      >
                        <Grid item xs={2}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Checkbox
                              checked={selectedCheckoutItem.includes(
                                cartItem.id
                              )}
                              color="secondary"
                              onChange={onChangeSelect}
                              id={cartItem.id}
                              inputProps={
                                {
                                  "aria-label": cartItem.id,
                                  "data-price": +cartItem.itemPrice,
                                } as CartItemCheckboxProps
                              }
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={10}>
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Typography>{cartItem.name}</Typography>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                          <Grid item xs={10}>
                            <Grid
                              container
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Grid item xs={8}>
                                <ProductImage
                                  src={cartItem.img?.url}
                                  alt={cartItem.img?.filename}
                                />
                              </Grid>
                              <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                              >
                                <IconButton
                                  onClick={() => onReduceItemQuantity(cartItem)}
                                >
                                  <RemoveIcon />
                                </IconButton>
                                <Typography>{cartItem.quantity}</Typography>
                                <IconButton
                                  onClick={() =>
                                    onIncreaseItemQuantity(cartItem.id)
                                  }
                                >
                                  <AddIcon />
                                </IconButton>
                              </Grid>
                              <Typography>
                                {formatPrice(+cartItem.itemPrice, "MYR")}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CartItemGrid>
                    </Grid>
                  ))}
                </CardContent>
              </CartCard>
            </Grid>
            <Grid item xs={11}>
              <CartCard>
                <CardContent>
                  <Grid container justifyContent="center" alignItems="center">
                    <Grid item sm={10} xs={7}>
                      <Typography fontWeight="bold" marginLeft="10%">
                        Total
                      </Typography>
                    </Grid>
                    <Grid item sm={2} xs={5}>
                      <Typography fontWeight="bold" marginLeft="10%">
                        RM {totalAmount.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CartCard>
            </Grid>
            <Grid item xs={11}>
              <Grid container justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  onClick={onCheckout}
                >
                  Checkout
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid item sm={5} xs={12}>
            <CartCard>
              <CardContent>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="center">
                      <Typography>Your cart is currently empty.</Typography>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography>
                        Continue browsing{" "}
                        <Link
                          component={GatsbyLink}
                          to={routeNames.products}
                          color="secondary"
                          underline="hover"
                        >
                          here
                        </Link>
                        .
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </CartCard>
          </Grid>
        )}
        <ItemRemoveConfirmationDialog
          modalOpen={removeConfirmModalDisplay}
          itemName={toBeRemovedItem.name}
          toggleModal={toggleRemoveConfirmModalDisplay}
          confirmRemove={confirmItemRemove}
        />
        <ProductErrorSnackbar
          isSnackbarOpen={isCheckoutError}
          toggleSnackbar={() => setIsCheckoutError(false)}
          msg="Please select at least one item to proceed!"
        />
      </Grid>
    </MainLayout>
  );
};

export default Cart;

export const Head = () => <SEO title={generateHeader("Shopping Cart")} />;
