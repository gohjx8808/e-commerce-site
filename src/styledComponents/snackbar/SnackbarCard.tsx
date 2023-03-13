import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const SnackbarCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  paddingLeft: theme.spacing(1),
}));

export default SnackbarCard;
