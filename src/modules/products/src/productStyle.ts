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
    fontWeight: 'bold',
  },
  cardTitle: {
    color: theme.palette.secondary.main,
    textAlign: 'center',
  },
  mobileSnackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 90,
    },
  },
  snackbarContent: {
    backgroundColor: 'grey',
  },
}));

export default productStyle;
