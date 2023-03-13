import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const CartCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.customPrimary.main,
  borderRadius: 10,
  "& .MuiCardContent-root:last-child": {
    paddingBottom: 16,
  },
}));

export default CartCard;
