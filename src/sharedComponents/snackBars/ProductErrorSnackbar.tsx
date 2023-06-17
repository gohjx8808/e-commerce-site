import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import StyledSnackbarContent from "@styledComponents/snackbar/StyledSnackbarContent";
import { CustomContentProps, closeSnackbar } from "notistack";
import React, { forwardRef, useCallback } from "react";

const ProductErrorSnackbar = forwardRef<HTMLDivElement, CustomContentProps>(
  (props, ref) => {
    const { id, message } = props;

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id]);

    return (
      <StyledSnackbarContent ref={ref}>
        <Alert onClose={handleDismiss} severity="warning">
          <Typography fontWeight="bold">{message}</Typography>
        </Alert>
      </StyledSnackbarContent>
    );
  }
);

export default ProductErrorSnackbar;
