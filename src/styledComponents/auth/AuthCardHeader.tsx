import CardHeader from "@mui/material/CardHeader";
import { styled } from "@mui/material/styles";

const AuthCardHeader = styled(CardHeader)(({ theme }) => ({
  color: theme.palette.common.white,
}));

export default AuthCardHeader;
