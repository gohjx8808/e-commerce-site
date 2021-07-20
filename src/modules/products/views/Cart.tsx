import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Add, Remove } from '@material-ui/icons';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import CustomBreadcrumbs from '../../../sharedComponents/CustomBreadcrumbs';
import getStripe from '../../../utils/stripejs';
import { increaseQuantity, reduceQuantity, removeItemFromCart } from '../src/productReducers';
import productStyle from '../src/productStyle';
import ItemRemoveConfirmationDialog from './ItemRemoveConfirmationDialog';

type CartItemCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  [key: string]: string | undefined | number
}

const Cart = () => {
  const styles = productStyle();
  const cartTitle = ['Item', 'Price (RM)', 'Quantity', 'Total (RM)'];
  const cartItems = useAppSelector((state) => state.product.shoppingCartItem);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [toBeRemovedItem, setToBeRemovedItem] = useState<products.shoppingCartItemData>({
    id: '',
    name: '',
    quantity: 0,
    price: '',
    price_id: '',
  });
  const [removeConfirmModalDisplay, setRemoveConfirmModalDisplay] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onChangeSelect = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'selectAll') {
      if (event.target.checked) {
        const allIds = [] as string[];
        let total = 0;
        cartItems.map((item) => {
          allIds.push(item.id);
          total += +item.price * item.quantity;
          return null;
        });
        setSelectedItems(allIds);
        setTotalAmount(total);
      } else {
        setSelectedItems([]);
        setTotalAmount(0);
      }
    } else {
      let rawTotal = totalAmount;
      if (event.target.checked) {
        setSelectedItems([...selectedItems, event.target.id]);
        setTotalAmount(rawTotal += +event.target.getAttribute('data-price')!);
      } else {
        const splicedArr = [...selectedItems];
        splicedArr.splice(splicedArr.indexOf(event.target.id), 1);
        setSelectedItems(splicedArr);
        setTotalAmount(rawTotal -= +event.target.getAttribute('data-price')!);
      }
    }
  };

  const toggleRemoveConfirmModalDisplay = () => {
    setRemoveConfirmModalDisplay(!removeConfirmModalDisplay);
  };

  const onReduceItemQuantity = (cartItem:products.shoppingCartItemData) => {
    if (+cartItem.quantity - 1 === 0) {
      setToBeRemovedItem(cartItem);
      toggleRemoveConfirmModalDisplay();
    } else {
      dispatch(reduceQuantity(cartItem.id));
      minusFromTotal();
    }
  };

  const confirmItemRemove = () => {
    dispatch(removeItemFromCart(toBeRemovedItem.id));
    minusFromTotal();
    toggleRemoveConfirmModalDisplay();
  };

  const minusFromTotal = () => {
    if (selectedItems.includes(toBeRemovedItem.id)) {
      const prevAmount = totalAmount;
      setTotalAmount(prevAmount - +toBeRemovedItem.price);
    }
  };

  const onIncreaseItemQuantity = (cartItemID:string, cartItemPrice:string) => {
    dispatch(increaseQuantity(cartItemID));
    if (selectedItems.includes(cartItemID)) {
      const prevAmount = totalAmount;
      setTotalAmount(prevAmount + +cartItemPrice);
    }
  };

  const onCheckout = async () => {
    const totalCheckoutItem = [] as products.checkoutData[];
    selectedItems.map((itemID) => {
      const selectedItem = cartItems.find((cartItem) => cartItem.id === itemID);
      if (selectedItem) {
        totalCheckoutItem.push({ price: selectedItem.price_id, quantity: selectedItem.quantity });
      }
      return null;
    });
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      mode: 'payment',
      lineItems: totalCheckoutItem,
      successUrl: `${window.location.origin}/page-2/`,
      cancelUrl: `${window.location.origin}/cart`,
    });
  };

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item lg={10} xs={11}>
        <Grid item xs={9}>
          <CustomBreadcrumbs />
        </Grid>
        <Card className={styles.cartCard}>
          <CardContent className={styles.cartTitleCardContent}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={2}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Checkbox
                    color="secondary"
                    onChange={onChangeSelect}
                    indeterminate={
                    selectedItems.length < cartItems.length && selectedItems.length > 0
                  }
                    checked={selectedItems.length > 0}
                    id="selectAll"
                    inputProps={{ 'aria-label': 'checkAll' }}
                  />
                </Grid>
              </Grid>
              {cartTitle.map((title) => (
                <Grid item xs={title === 'Item' ? 4 : 2} key={title}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <Typography className={styles.boldText}>{title}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={10} xs={11}>
        <Card className={styles.cartCard}>
          <CardContent className={styles.cartTitleCardContent}>
            {cartItems.map((cartItem, index) => (
              <Grid
                container
                justify="center"
                alignItems="center"
                key={cartItem.id}
                className={`${styles.cartItemCard} ${index === 0 ? '' : styles.topBorderedCartItemCard}`}
              >
                <Grid item xs={2}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <Checkbox
                      checked={selectedItems.includes(cartItem.id)}
                      color="secondary"
                      onChange={onChangeSelect}
                      id={cartItem.id}
                      inputProps={{
                        'aria-label': cartItem.id,
                        'data-price': +cartItem.price * cartItem.quantity,
                      } as CartItemCheckboxProps}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                  >
                    <Typography>{cartItem.name}</Typography>
                    {cartItem.imgURL!.map((localFile) => {
                      const imageData = getImage(localFile)!;
                      return (
                        <Box
                          className={styles.cartItemImageContainer}
                          key={imageData.images.fallback?.src}
                        >
                          <GatsbyImage
                            image={imageData}
                            alt={cartItem.id}
                            imgClassName={styles.cartItemImage}
                          />
                        </Box>
                      );
                    })}
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <Typography>{cartItem.price}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <IconButton
                      onClick={
                        () => onReduceItemQuantity(cartItem)
                      }
                    >
                      <Remove />
                    </IconButton>
                    <Typography>{cartItem.quantity}</Typography>
                    <IconButton onClick={() => onIncreaseItemQuantity(cartItem.id, cartItem.price)}>
                      <Add />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <Typography>
                      {(+cartItem.price * cartItem.quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={10} xs={11}>
        <Card className={styles.cartCard}>
          <CardContent className={styles.cartTitleCardContent}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={10}>
                <Typography className={styles.totalTitle}>Total</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={styles.totalTitle}>
                  RM
                  {' '}
                  {totalAmount.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={10} xs={11}>
        <Grid container justify="flex-end">
          <Button variant="contained" color="secondary" size="medium" onClick={() => onCheckout()}>
            Checkout
          </Button>
        </Grid>
      </Grid>
      <ItemRemoveConfirmationDialog
        modalOpen={removeConfirmModalDisplay}
        itemName={toBeRemovedItem.name}
        toggleModal={toggleRemoveConfirmModalDisplay}
        confirmRemove={confirmItemRemove}
      />
    </Grid>
  );
};

export default Cart;
