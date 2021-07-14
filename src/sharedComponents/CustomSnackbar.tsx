import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarContent, useSnackbar } from 'notistack';
import React, { forwardRef, useCallback } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '344px !important',
    },
    [theme.breakpoints.down('xs')]: {
      bottom: 90,
    },
  },
  card: {
    backgroundColor: 'grey',
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
    color: 'white',
    padding: '8px 8px',
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
