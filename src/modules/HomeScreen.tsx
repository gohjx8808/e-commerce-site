import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import {
  GatsbyImage, getImage, ImageDataLike,
} from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { ExpandMore } from '@material-ui/icons';

const useStyle = makeStyles((theme) => ({
  carouselImages: {
    borderRadius: 10,
  },
  carouselNavWrapper: {
    '&:hover': {
      backgroundColor: '#FFFFFF60',
    },
  },
  sectionContainer: {
    paddingTop: 20,
  },
  unboldH6: {
    fontWeight: 'normal',
  },
  viewMoreBtn: {
    marginTop: 10,
  },
  productCarouselNavButton: {
    backgroundColor: 'transparent!important',
    color: 'black!important',
  },
  hyperlink: {
    textDecorationLine: 'underline',
  },
  imageListRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    height: 450,
  },
}));

interface imageInnerStructure{
  node:{
    childImageSharp:ImageDataLike
    id:string
  }
}

const HomeScreen = () => {
  const [productImages, setProductImages] = useState<ImageDataLike[]>([]);
  const styles = useStyle();
  const homeQuery = useStaticQuery(graphql`
    query {
      allFile(filter: {relativeDirectory: {eq: "banner"}}) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData
            }
            id
          }
        }
      }
      products: allContentfulProducts(filter: {node_locale: {eq: "en-US"}}) {
        edges {
          node {
            name
            contentful_id
            category
            productImage {
              gatsbyImageData
            }
            price
            contentDescription {
              raw
            }
          }
        }
      }
    }
  `);

  useEffect(() => {
    const extractedProducts:products.innerProductQueryData[] = homeQuery.products.edges;
    const tempProduct = [] as ImageDataLike[];
    extractedProducts.forEach((product) => {
      tempProduct.push(product.node.productImage[0]);
    });
    setProductImages(tempProduct);
  }, [homeQuery]);

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <Carousel
          navButtonsWrapperProps={{ className: styles.carouselNavWrapper, style: {} }}
          navButtonsProps={{
            className: styles.productCarouselNavButton,
            style: {},
          }}
          animation="slide"
          interval={3000}
        >
          {homeQuery.allFile.edges.map((banner:imageInnerStructure) => {
            const bannerNode = banner.node;
            const bannerRealImageData = getImage(bannerNode.childImageSharp)!;
            return (
              <GatsbyImage
                image={bannerRealImageData}
                alt={bannerNode.id}
                key={bannerNode.id}
                imgClassName={styles.carouselImages}
              />
            );
          })}
        </Carousel>
        <Grid container justify="center" alignItems="center" className={styles.sectionContainer} direction="column">
          <Typography variant="h4" color="secondary">Welcome!</Typography>
          <Typography variant="h6" className={styles.unboldH6}>Hello! Welcome to the path towards my Dream! YJ Art Journal!</Typography>
          <Typography variant="h6" className={styles.unboldH6}>You are very welcome to browse along and hope it will lighten up your day! Enjoy!</Typography>
          <Button>
            <Typography variant="subtitle1" className={`${styles.unboldH6} ${styles.hyperlink}`}>Learn more!</Typography>
          </Button>
        </Grid>
        <Grid container className={styles.sectionContainer} direction="column">
          <Typography variant="h5" color="secondary">Product Gallery</Typography>
        </Grid>
      </Grid>
      <Box className={styles.imageListRoot}>
        <ImageList rowHeight="auto" cols={5} className={styles.imageList}>
          {productImages.map((image) => {
            const productImagesData = getImage(image)!;
            return (
              <ImageListItem key={productImagesData.images.fallback?.src}>
                <GatsbyImage
                  image={productImagesData}
                  alt={productImagesData.images.fallback?.src!}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Box>
      <IconButton>
        <ExpandMore />
      </IconButton>
    </Grid>
  );
};

export default HomeScreen;
