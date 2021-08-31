import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import StyledMenu from '../../../sharedComponents/StyledMenu';
import StyledMenuItem from '../../../sharedComponents/StyledMenuItem';
import productStyle from '../src/productStyle';

interface ItemVariationMenuOwnProps{
  anchorEl:null | HTMLElement
  handleClose:()=>void
}

const ItemVariationMenu = (props:ItemVariationMenuOwnProps) => {
  const { anchorEl, handleClose } = props;
  const styles = productStyle();

  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <StyledMenuItem>
        <ListItemText primary="With Keychain" />
      </StyledMenuItem>
      <StyledMenuItem>
        <ListItemText primary="Without Keychain" />
      </StyledMenuItem>
      <Grid container justifyContent="center" alignItems="center" className={styles.verticalMargin}>
        <Button variant="outlined" color="secondary">Confirm</Button>
      </Grid>
    </StyledMenu>
  );
};

export default ItemVariationMenu;
