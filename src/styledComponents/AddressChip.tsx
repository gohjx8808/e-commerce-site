import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

interface AddressChipProps{
  customcolor:string
}

const AddressChip = styled(Chip)<AddressChipProps>(({ customcolor }) => ({
  color: customcolor,
  borderColor: customcolor,
  '& .MuiChip-icon': {
    color: customcolor,
  },
}));

export default AddressChip;
