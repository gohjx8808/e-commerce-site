import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

const ItemQuantityInput = styled(FormControl)(({ theme }) => ({
  borderRadius: 0,
  borderTopWidth: 0.5,
  borderBottomWidth: 0.5,
  borderStyle: 'solid',
  borderColor: theme.palette.secondary.main,
  '& input': {
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default ItemQuantityInput;
