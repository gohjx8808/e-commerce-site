import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";

interface ExpandedCellPopperProps {
  width: number;
}

const ExpandedCellPopper = styled(Popper)<ExpandedCellPopperProps>(
  ({ width }) => ({
    width,
  })
);

export default ExpandedCellPopper;
