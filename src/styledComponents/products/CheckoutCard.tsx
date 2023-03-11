import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const CheckoutCard = styled(Card)(({ theme }) => ({
  borderColor: theme.palette.secondary.main,
  borderWidth: 2,
  [theme.breakpoints.up("lg")]: {
    height: 880,
  },
  height: 510,
}));

export default CheckoutCard;
