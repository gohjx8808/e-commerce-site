import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ExpandMore } from '@material-ui/icons';
import { graphql, useStaticQuery } from 'gatsby';
import {
  GatsbyImage, getImage, ImageDataLike,
} from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';

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
  productCarouselNavButton: {
    backgroundColor: 'transparent!important',
    color: 'black!important',
  },
  hyperlink: {
    textDecorationLine: 'underline',
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
  imageListRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingTop: 10,
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

interface imageListImages{
  productImage:ImageDataLike
  rows:number
  cols:number
}

const HomeScreen = () => {
  const [productImages, setProductImages] = useState<imageListImages[]>([]);
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
            row
            column
          }
        }
      }
    }
  `);

  useEffect(() => {
    const extractedProducts:products.innerProductQueryData[] = homeQuery.products.edges;
    const tempProduct = [] as imageListImages[];
    extractedProducts.forEach((product) => {
      tempProduct.push({
        productImage: product.node.productImage[0],
        rows: parseInt(product.node.row, 10),
        cols: parseInt(product.node.column, 10),
      });
    });
    setProductImages(tempProduct);
  }, [homeQuery]);

  return (
    <Grid container justifyContent="center" alignItems="center">
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
        <Grid container justifyContent="center" alignItems="center" className={styles.sectionContainer} direction="column">
          <Typography variant="h4" color="secondary">Welcome!</Typography>
          <Typography variant="h6">Hello! Welcome to the path towards my Dream! YJ Art Journal!</Typography>
          <Typography variant="h6">You are very welcome to browse along and hope it will lighten up your day! Enjoy!</Typography>
          <Button>
            <Typography variant="subtitle1" className={styles.hyperlink}>Learn more!</Typography>
          </Button>
        </Grid>
        <Grid container className={styles.sectionContainer} direction="column">
          <Typography variant="h5" color="secondary">Product Gallery</Typography>
        </Grid>
      </Grid>
      <Box className={styles.imageListRoot}>
        <ImageList rowHeight="auto" cols={5} className={styles.imageList}>
          {productImages.map((image) => {
            const productImagesData = getImage(image.productImage)!;
            return (
              <ImageListItem
                key={productImagesData.images.fallback?.src}
                cols={image.cols}
                rows={image.rows}
              >
                <GatsbyImage
                  image={productImagesData}
                  alt={productImagesData.images.fallback?.src!}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Box>
      <IconButton aria-label="more product images">
        <ExpandMore />
      </IconButton>
    </Grid>
  );
};

export default HomeScreen;
