import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { useState } from 'react';
import StyledMenu from '../../../sharedComponents/StyledMenu';
import StyledMenuItem from '../../../sharedComponents/StyledMenuItem';
import productStyle from '../src/productStyle';

interface ItemVariationMenuOwnProps{
  anchorEl:null | HTMLElement
  handleClose:()=>void
  addToCart:(variation:string)=>void
}

const ItemVariationMenu = (props:ItemVariationMenuOwnProps) => {
  const { anchorEl, handleClose, addToCart } = props;
  const [selectedVariation, setSelectedVariation] = useState('');
  const styles = productStyle();

  const onClickConfirm = () => {
    addToCart(selectedVariation);
    setSelectedVariation('');
    handleClose();
  };

  const updateSelectedVariation = (variation:string) => {
    setSelectedVariation(variation);
  };

  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <StyledMenuItem onClick={() => updateSelectedVariation('With Keychain')} selected={selectedVariation === 'With Keychain'}>
        <ListItemText primary="With Keychain" />
      </StyledMenuItem>
      <StyledMenuItem onClick={() => updateSelectedVariation('Without Keychain')} selected={selectedVariation === 'Without Keychain'}>
        <ListItemText primary="Without Keychain" />
      </StyledMenuItem>
      <Grid container justifyContent="center" alignItems="center" className={styles.verticalMargin}>
        <Button variant="outlined" color="secondary" onClick={onClickConfirm}>Confirm</Button>
      </Grid>
    </StyledMenu>
  );
};

export default ItemVariationMenu;
