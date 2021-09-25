import { makeStyles } from '@mui/styles';
import React from 'react';
import { Theme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';

interface Props {
  children: React.ReactElement;
}

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: theme.zIndex.appBar + 1,
  },
}));

const ScrollTop = (props: Props) => {
  const { children } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        className={classes.root}
      >
        {children}
      </Box>
    </Zoom>
  );
};

export default ScrollTop;
