import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import React, { useState } from 'react';
import { useEffect } from 'react';

interface Props {
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  mostBottom: {
    [theme.breakpoints.down('md')]: {
      bottom: theme.spacing(10),
    },
  },
}));

const ScrollTop = (props: Props) => {
  const { children } = props;
  const classes = useStyles();
  const [isMostBottom, setIsMostBottom] = useState(false);

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

  useEffect(() => {
    const handleOnScroll = () => {
      const mostBottomAnchor = document.querySelector('#most-bottom-anchor')!;
      setIsMostBottom(isInViewport(mostBottomAnchor));
    };
    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

  const isInViewport = (element:Element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0
        && rect.left >= 0
        && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        className={clsx(classes.root, { [classes.mostBottom]: isMostBottom })}
      >
        {children}
      </Box>
    </Zoom>
  );
};

export default ScrollTop;
