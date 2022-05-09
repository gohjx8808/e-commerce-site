import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

interface CheckoutCardProps {
  outsidemalaysiastate: boolean;
}

const CheckoutCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "outsidemalaysiastate",
})<CheckoutCardProps>(({ theme, outsidemalaysiastate }) => ({
  borderColor: theme.palette.secondary.main,
  borderWidth: 2,
  [theme.breakpoints.up("lg")]: {
    height: outsidemalaysiastate ? 960 : 880,
  },
  height: 510,
}));

export default CheckoutCard;
