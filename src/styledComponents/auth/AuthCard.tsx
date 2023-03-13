import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const AuthCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.customSecondary.main,
}));

export default AuthCard;
