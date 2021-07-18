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
  rootContainer: {
    paddingTop: 20,
    paddingRight: 50,
    paddingLeft: 50,
    paddingBottom: 20,
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
  },
  cartCardContainer: {
    marginTop: 20,
    marginBottom: 20,
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
}));

export default productStyle;
