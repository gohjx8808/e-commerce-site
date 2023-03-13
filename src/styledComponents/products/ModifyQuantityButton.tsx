import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

interface ModifyQuantityButtonProps {
  actiontype: "add" | "minus";
}

const ModifyQuantityButton = styled(IconButton)<ModifyQuantityButtonProps>(
  ({ theme, actiontype }) => ({
    borderTopLeftRadius: actiontype === "minus" ? 5 : 0,
    borderBottomLeftRadius: actiontype === "minus" ? 5 : 0,
    borderTopRightRadius: actiontype === "add" ? 5 : 0,
    borderBottomRightRadius: actiontype === "add" ? 5 : 0,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
  })
);

export default ModifyQuantityButton;
