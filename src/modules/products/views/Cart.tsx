import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Add, Remove } from '@material-ui/icons';
import { navigate } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import CustomBreadcrumbs from '../../../sharedComponents/CustomBreadcrumbs';
import routeNames from '../../../utils/routeNames';
import {
  increaseQuantity, reduceQuantity, removeItemFromCart, updateSelectedCheckoutItemsID,
} from '../src/productReducers';
import productStyle from '../src/productStyle';
import ItemRemoveConfirmationDialog from './ItemRemoveConfirmationDialog';

type CartItemCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  [key: string]: string | undefined | number
}

const Cart = () => {
  const styles = productStyle();
  const cartTitle = ['Item', 'Price (RM)', 'Quantity', 'Total (RM)'];
  const cartItems = useAppSelector((state) => state.product.shoppingCartItem);
  const selectedCheckoutItemsID = useAppSelector((state) => state.product.selectedCheckoutItemsID);
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

  useEffect(() => {
    let currentTotal = 0;
    cartItems.map((item) => {
      if (selectedCheckoutItemsID.includes(item.id)) {
        currentTotal += +item.price * +item.quantity;
      }
      return null;
    });
    setTotalAmount(currentTotal);
  }, [cartItems, selectedCheckoutItemsID]);

  const onChangeSelect = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'selectAll') {
      if (event.target.checked) {
        const allIds = [] as string[];
        cartItems.map((item) => {
          allIds.push(item.id);
          return null;
        });
        dispatch(updateSelectedCheckoutItemsID(allIds));
      } else {
        dispatch(updateSelectedCheckoutItemsID([]));
      }
    } else if (event.target.checked) {
      const prevArr = [...selectedCheckoutItemsID, event.target.id];
      dispatch(updateSelectedCheckoutItemsID(prevArr));
    } else {
      const splicedArr = [...selectedCheckoutItemsID];
      splicedArr.splice(splicedArr.indexOf(event.target.id), 1);
      dispatch(updateSelectedCheckoutItemsID(splicedArr));
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
    }
  };

  const confirmItemRemove = () => {
    const removeIndex = selectedCheckoutItemsID.indexOf(toBeRemovedItem.id);
    if (removeIndex !== -1) {
      const copiedIDs = [...selectedCheckoutItemsID];
      copiedIDs.splice(removeIndex, 1);
      dispatch(updateSelectedCheckoutItemsID(copiedIDs));
    }
    dispatch(removeItemFromCart(toBeRemovedItem.id));
    toggleRemoveConfirmModalDisplay();
  };

  const onIncreaseItemQuantity = (cartItemID:string) => {
    dispatch(increaseQuantity(cartItemID));
  };

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item xs={11}>
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
                      selectedCheckoutItemsID.length < cartItems.length
                      && selectedCheckoutItemsID.length > 0
                  }
                    checked={selectedCheckoutItemsID.length > 0}
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
      <Grid item xs={11}>
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
                      checked={selectedCheckoutItemsID.includes(cartItem.id)}
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
                    <IconButton onClick={() => onIncreaseItemQuantity(cartItem.id)}>
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
      <Grid item xs={11}>
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
      <Grid item xs={11}>
        <Grid container justify="flex-end">
          <Button variant="contained" color="secondary" size="medium" onClick={() => navigate(routeNames.checkout)}>
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
