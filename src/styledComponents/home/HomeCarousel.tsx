import { styled } from "@mui/material/styles";
import { Carousel } from "react-responsive-carousel";

const HomeCarousel = styled(Carousel)(({ theme }) => ({
  paddingTop: 30,
  [theme.breakpoints.up("sm")]: {
    padding: 24,
    paddingBottom: 0,
  },
}));

export default HomeCarousel;
