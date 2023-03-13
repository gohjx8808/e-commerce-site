import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const StyledProductCard = styled(Card)(({ theme }) => ({
  boxShadow: "5px 5px 25px 0 rgba(46,61,73,.2)",
  borderRadius: 6,
  cursor: "pointer",
  "&:hover": {
    textDecorationLine: "underline",
    textDecorationColor: theme.palette.primary.main,
  },
  color: theme.palette.secondary.main,
  textAlign: "center",
}));

export default StyledProductCard;
