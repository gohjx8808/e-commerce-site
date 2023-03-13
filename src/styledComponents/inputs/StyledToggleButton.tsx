import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";

interface StyledToggleButtonProps {
  bgcolor: string;
}

const StyledToggleButton = styled(ToggleButton)<StyledToggleButtonProps>(
  ({ bgcolor }) => ({
    "&.Mui-selected": {
      backgroundColor: bgcolor,
      "&:hover": {
        backgroundColor: bgcolor,
      },
    },
  })
);

export default StyledToggleButton;
