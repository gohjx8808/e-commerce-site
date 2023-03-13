import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { socialMediaLinks } from "@utils/constants";
import React from "react";
import { useXsDownMediaQuery } from "../hooks";
import EmailIcon from "../svg/EmailIcon";
import FBIcon from "../svg/FBIcon";
import InstagramIcon from "../svg/InstagramIcon";
import XhsIcon from "../svg/XhsIcon";

const Footer = () => {
  const isSmView = useXsDownMediaQuery();

  return (
    <AppBar position="static" color="customPrimary" elevation={0}>
      <Container>
        <Toolbar disableGutters>
          {isSmView && (
            <>
              <IconButton
                aria-label="instagram"
                color="inherit"
                target="_blank"
                rel="noreferrer"
                href={socialMediaLinks.INSTAGRAM}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                aria-label="facebook"
                color="inherit"
                target="_blank"
                rel="noreferrer"
                href={socialMediaLinks.FACEBOOK}
              >
                <FBIcon />
              </IconButton>
              <IconButton
                aria-label="xiaohongshu"
                color="inherit"
                target="_blank"
                rel="noreferrer"
                href={socialMediaLinks.XHS}
              >
                <XhsIcon />
              </IconButton>
            </>
          )}
          <Typography variant="body1" color="inherit">
            © 2021 yjartjournal
          </Typography>
          <Box flexGrow={1} />
          {!isSmView && (
            <>
              <IconButton
                aria-label="instagram"
                color="inherit"
                target="_blank"
                rel="noreferrer"
                href={socialMediaLinks.INSTAGRAM}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                aria-label="facebook"
                color="inherit"
                target="_blank"
                rel="noreferrer"
                href={socialMediaLinks.FACEBOOK}
              >
                <FBIcon />
              </IconButton>
              <IconButton
                aria-label="xiaohongshu"
                color="inherit"
                target="_blank"
                rel="noreferrer"
                href={socialMediaLinks.XHS}
              >
                <XhsIcon />
              </IconButton>
              <IconButton
                aria-label="email"
                color="inherit"
                target="_blank"
                rel="noreferrer"
                href="mailto:hello@yjartjournal.com"
              >
                <EmailIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
