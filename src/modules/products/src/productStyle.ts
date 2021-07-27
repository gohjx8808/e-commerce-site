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
  },
  priceText: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
  cardTitle: {
    color: theme.palette.secondary.main,
    textAlign: 'center',
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
    height: 300,
    width: '100%',
  },
  totalPayText: {
    paddingTop: 5,
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
  checkoutItemDataGrid: {
    borderColor: '#B67B5E!important',
    borderWidth: '2px!important',
  },
}));

export default productStyle;
