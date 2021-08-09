import { makeStyles } from '@material-ui/core/styles';

const productStyle = makeStyles((theme) => ({
  productCard: {
    boxShadow: '5px 5px 25px 0 rgba(46,61,73,.2)',
    backgroundColor: '#fff',
    borderRadius: '6px',
  },
  carouselImageContainer: {
    minHeight: 300,
    alignItems: 'center',
    display: 'flex',
    cursor: 'zoom-in',
  },
  priceText: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
  cardTitle: {
    color: theme.palette.secondary.main,
    textAlign: 'center',
    height: 95,
  },
  shoppingCartIcon: {
    color: theme.palette.secondary.main,
  },
  cartTitleCardContent: {
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  cartCard: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 10,
    width: '100%',
  },
  boldText: {
    fontWeight: 'bold',
  },
  cartItemImageContainer: {
    width: '30%',
    marginTop: 5,
  },
  cartItemImage: {
    borderRadius: 5,
  },
  cartItemCard: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  topBorderedCartItemCard: {
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
  },
  totalTitle: {
    fontWeight: 'bold',
    paddingLeft: '10%',
  },
  checkoutItemContainer: {
    height: 520,
    width: '100%',
  },
  outsideMalaysiaCheckoutItemContainer: {
    height: 580,
    width: '100%',
  },
  totalPayTextContainer: {
    padding: 20,
  },
  totalPayText: {
    fontWeight: 525,
  },
  shippingInfoFullWidth: {
    width: '95%!important',
  },
  shippingInfoHalfWidth: {
    [theme.breakpoints.up('lg')]: {
      width: '90%!important',
    },
    width: '95%!important',
  },
  secondaryBorder: {
    borderColor: `${theme.palette.secondary.main}!important`,
    borderWidth: '2px!important',
  },
  checkoutOrderCard: {
    height: 620,
  },
  outsideMalaysiaCheckoutOrderCard: {
    height: 687,
  },
  rmbPadding: {
    paddingLeft: 20,
  },
  proceedPaymentBtnContainer: {
    marginTop: 10,
  },
  checkListFront: {
    flex: 3,
    textAlign: 'right',
  },
  checkListBack: {
    flex: 1,
    textAlign: 'right',
  },
  categorySpacing: {
    paddingBottom: 20,
    paddingTop: 20,
  },
}));

export default productStyle;
