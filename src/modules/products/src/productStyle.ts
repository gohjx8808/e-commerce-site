import { alpha, makeStyles } from '@material-ui/core/styles';

const productStyle = makeStyles((theme) => ({
  productCard: {
    boxShadow: '5px 5px 25px 0 rgba(46,61,73,.2)',
    backgroundColor: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    '&:hover': {
      textDecorationLine: 'underline',
      textDecorationColor: theme.palette.primary.main,
    },
  },
  carouselImageContainer: {
    alignItems: 'center',
    display: 'flex',
    cursor: 'zoom-in',
  },
  priceText: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  },
  dicountedPriceOriText: {
    textDecoration: 'line-through',
    textDecorationColor: 'grey',
    color: 'grey',
  },
  discountedPriceText: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
  productNameContainer: {
    [theme.breakpoints.down('xs')]: {
      height: 70,
    },
    height: 95,
  },
  productName: {
    color: theme.palette.secondary.main,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
      fontWeight: 'bold',
    },
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
  checkoutOrderCard: {
    [theme.breakpoints.up('lg')]: {
      height: 855,
    },
    height: 480,
  },
  outsideMalaysiaCheckoutOrderCard: {
    [theme.breakpoints.up('lg')]: {
      height: 930,
    },
    height: 480,
  },
  checkoutItemContainer: {
    [theme.breakpoints.up('lg')]: {
      height: 665,
    },
    height: 300,
    width: '100%',
  },
  outsideMalaysiaCheckoutItemContainer: {
    [theme.breakpoints.up('lg')]: {
      height: 745,
    },
    height: 300,
    width: '100%',
  },
  totalPayTextContainer: {
    padding: 20,
  },
  rightText: {
    textAlign: 'right',
  },
  secondaryBorder: {
    borderColor: `${theme.palette.secondary.main}!important`,
    borderWidth: '2px!important',
  },
  rmbPadding: {
    paddingLeft: 20,
  },
  proceedPaymentBtnContainer: {
    marginTop: 10,
  },
  categorySpacing: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  topSpacing: {
    paddingTop: 40,
  },
  productCategoryImg: {
    borderRadius: 10,
  },
  noPaddingBottomContent: {
    paddingBottom: '16px!important',
  },
  shoppingCartBtn: {
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      fontSize: 20,
    },
  },
  productCardCarouselNavButton: {
    [theme.breakpoints.down('xs')]: {
      padding: '2px!important',
      marginRight: '2px!important',
      marginLeft: '2px!important',
    },
  },
  dekstopView: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    display: 'none',
  },
  mobileView: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
    display: 'none',
  },
  productDescriptionBg: {
    backgroundColor: theme.palette.background.paper,
  },
  centerText: {
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  minusIconButton: {
    borderRadius: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    padding: 8,
  },
  plusIconButton: {
    borderRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 0.5,
    borderStyle: 'solid',
    padding: 8,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
  },
  quantityInput: {
    borderRadius: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: theme.palette.secondary.main,
  },
  bottomSpacing: {
    paddingBottom: 20,
  },
  productDescriptionImg: {
    borderRadius: 8,
  },
  productRecommendationNameContainer: {
    height: 64,
  },
  minorSpacingTop: {
    paddingTop: 10,
  },
  itemVariation: {
    borderRadius: '8px!important',
    borderWidth: '1px!important',
    borderColor: 'rgb(0 0 0 / 38%)!important',
    marginRight: 5,
  },
  productVariationActiveColor: {
    borderColor: `${theme.palette.secondary.main}!important`,
    color: `${theme.palette.secondary.main}!important`,
    backgroundColor: `${alpha(theme.palette.secondary.main, 0.12)}!important`,
  },
  verticalMargin: {
    marginTop: 10,
    marginBottom: 5,
  },
  unboldText: {
    fontWeight: 'normal',
  },
  errorPadding: {
    paddingLeft: 15,
  },
}));

export default productStyle;
