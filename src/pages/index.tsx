import { useImageGalleryImages } from "@modules/imageGallery/src/imageGalleryQueries";
import SEO from "@modules/SEO";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ImageListItem from "@mui/material/ImageListItem";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { generateHeader } from "@utils/helper";
import { Link as GatsbyLink, navigate } from "gatsby";
import MainLayout from "../layouts/MainLayout";
import HomeImageList from "../styledComponents/home/HomeImageList";
import routeNames from "../utils/routeNames";

const HomeScreen = () => {
  const { data: contentfulImages } = useImageGalleryImages();

  return (
    <MainLayout homeCarouselBanner>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        marginTop={10}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Typography variant="h4" color="secondary" marginBottom={3}>
              Welcome!
            </Typography>
            <Typography variant="h6" textAlign="center">
              Hello! Welcome to the path towards my Dream! YJ Art Journal!
            </Typography>
            <Typography variant="h6" textAlign="center" marginBottom={3}>
              You are very welcome to browse along and hope it will lighten up
              your day! Enjoy!
            </Typography>
            <Link
              component={GatsbyLink}
              to={routeNames.learnMore}
              underline="hover"
            >
              <Typography
                variant="subtitle1"
                color="secondary"
                textAlign="center"
              >
                ABOUT MY SHOP
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Grid container marginTop={10} marginBottom={3} direction="column">
          <Typography variant="h5" color="secondary">
            Product Gallery
          </Typography>
        </Grid>
        {contentfulImages && (
          <HomeImageList rowHeight="auto" cols={5}>
            {contentfulImages.slice(0, 25).map((image) => (
              <ImageListItem key={image.image.filename}>
                <img
                  src={image.image.url}
                  alt={image.image.filename}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </HomeImageList>
        )}
        <IconButton
          aria-label="more product images"
          onClick={() => navigate(routeNames.imageGallery)}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Grid>
    </MainLayout>
  );
};

export default HomeScreen;

export const Head = () => (
  <SEO title={generateHeader("The Handmade Cottage")} />
);
