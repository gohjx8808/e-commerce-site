import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledTitle = styled(Typography)(({ theme }) => (
  {
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
    textDecorationLine: 'underline',
  }
));

export default StyledTitle;
