import Box from "@mui/material/Box";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";
import React from "react";
import { useXsDownMediaQuery } from "../hooks";

interface Props {
  children: React.ReactElement;
}

const ScrollTop = (props: Props) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const isPhoneView = useXsDownMediaQuery();

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        position="fixed"
        bottom={{ sm: 80, xs: 65 }}
        right={16}
        zIndex={(theme) =>
          isPhoneView ? theme.zIndex.drawer : theme.zIndex.drawer + 1
        }
      >
        {children}
      </Box>
    </Zoom>
  );
};

export default ScrollTop;
