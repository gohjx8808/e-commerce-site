import { alpha, styled } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ItemVariationToggleButton = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    borderRadius: 5,
    "&.Mui-selected": {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main,
      backgroundColor: alpha(theme.palette.secondary.main, 0.12),
    },
  },
}));

export default ItemVariationToggleButton;
