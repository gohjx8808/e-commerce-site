import { styled } from "@mui/material/styles";
import { GatsbyImage } from "gatsby-plugin-image";

const HomeCarouselImage = styled(GatsbyImage)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    borderRadius: 10,
  },
}));

export default HomeCarouselImage;
