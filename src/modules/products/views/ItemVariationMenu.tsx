import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import StyledMenuItem from '../../../styledComponents/StyledListItem';
import StyledMenu from '../../../styledComponents/StyledMenu';

interface ItemVariationMenuOwnProps{
  anchorEl:null | HTMLElement
  handleClose:()=>void
  addToCart:(variation:string)=>void
}

const ItemVariationMenu = (props:ItemVariationMenuOwnProps) => {
  const { anchorEl, handleClose, addToCart } = props;
  const [selectedVariation, setSelectedVariation] = useState('');

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
      <Grid container justifyContent="center" alignItems="center" marginTop={1.5} marginBottom={0.5}>
        <Button variant="outlined" color="secondary" onClick={onClickConfirm}>Confirm</Button>
      </Grid>
    </StyledMenu>
  );
};

export default ItemVariationMenu;
