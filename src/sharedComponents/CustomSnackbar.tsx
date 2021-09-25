import { makeStyles } from '@mui/styles';
import { SnackbarContent, useSnackbar } from 'notistack';
import React, { forwardRef, useCallback } from 'react';
import { Theme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '344px !important',
    },
    [theme.breakpoints.down('xs')]: {
      bottom: 90,
    },
  },
  card: {
    backgroundColor: `${theme.palette.secondary.main}!important`,
    width: '100%',
  },
  snackbarMsg: {
    color: 'white',
    fontWeight: 400,
  },
  actionRoot: {
    padding: '8px 8px 8px 16px',
    justifyContent: 'space-between',
  },
  icons: {
    marginLeft: 'auto',
  },
  expand: {
    color: 'white!important',
    padding: '8px 8px!important',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

interface CustomSnackbarOwnProps{
  id: string | number
  message:string| React.ReactNode
}

const CustomSnackbar = forwardRef<
  HTMLDivElement,
  { id: string | number, message: string | React.ReactNode }
  >((props:CustomSnackbarOwnProps, ref) => {
    const { message, id } = props;
    const classes = useStyles();
    const { closeSnackbar } = useSnackbar();

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref} className={classes.root}>
        <Card className={classes.card}>
          <CardActions classes={{ root: classes.actionRoot }}>
            <Typography variant="subtitle1" className={classes.snackbarMsg}>{message}</Typography>
            <div className={classes.icons}>
              <IconButton className={classes.expand} onClick={handleDismiss}>
                <CloseIcon />
              </IconButton>
            </div>
          </CardActions>
        </Card>
      </SnackbarContent>
    );
  });

export default CustomSnackbar;
