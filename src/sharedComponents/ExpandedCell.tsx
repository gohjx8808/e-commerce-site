import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { GridCellParams } from "@mui/x-data-grid";
import React, { memo, useRef, useState } from "react";
import ExpandedCellPopper from "../styledComponents/ExpandedCellPopper";

interface CellExpandProps {
  value: string;
  width: number;
}

const CellExpand = memo((props: CellExpandProps) => {
  const { width, value } = props;
  const wrapper = useRef<HTMLDivElement | null>(null);
  const cellDiv = useRef(null);
  const cellValue = useRef<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showFullCell, setShowFullCell] = useState(false);
  const [showPopper, setShowPopper] = useState(false);

  const handleMouseEnter = () => {
    const currentCellValue = cellValue.current!;
    const isCurrentlyOverflown =
      currentCellValue.clientWidth < currentCellValue.scrollWidth;
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  return (
    <Box
      ref={wrapper}
      width="100%"
      position="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box ref={cellDiv} width={width} position="absolute" top={0} />
      <Box ref={cellValue} overflow="hidden" textOverflow="ellipsis">
        {value}
      </Box>
      {showPopper && (
        <ExpandedCellPopper
          open={showFullCell && anchorEl != null}
          anchorEl={anchorEl}
          width={width}
        >
          <Paper elevation={1}>
            <Typography variant="body2" padding={1}>
              {value}
            </Typography>
          </Paper>
        </ExpandedCellPopper>
      )}
    </Box>
  );
});

const ExpandedCell = (params: GridCellParams) => {
  const { value, colDef } = params;

  return (
    <CellExpand value={value ? value.toString() : ""} width={colDef.width!} />
  );
};

export default ExpandedCell;
