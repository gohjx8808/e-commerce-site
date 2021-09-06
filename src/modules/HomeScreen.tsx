import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  graphql, navigate, useStaticQuery, Link as GatsbyLink,
} from 'gatsby';
import {
  GatsbyImage, getImage, ImageDataLike,
} from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks';
import routeNames from '../utils/routeNames';
import { storeAllProducts } from './products/src/productReducers';

const useStyle = makeStyles((theme) => ({
  sectionContainer: {
    paddingTop: 20,
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
    paddingTop: 10,
  },
  imageList: {
    maxHeight: 450,
  },
  centerText: {
    textAlign: 'center',
  },
}));

interface imageListImages{
  productImage:ImageDataLike
  rows:number
  cols:number
}

const HomeScreen = () => {
  const [productImages, setProductImages] = useState<imageListImages[]>([]);
  const dispatch = useAppDispatch();
  const styles = useStyle();
  const homeQuery = useStaticQuery(graphql`
    query {
      products: allContentfulProducts(filter: {node_locale: {eq: "en-US"}}) {
        edges {
          node {
            name
            contentful_id
            category
            productImage {
              gatsbyImageData(placeholder: BLURRED)
            }
            price
            contentDescription {
              raw
            }
            row
            column
            discountedPrice
          }
        }
      }
    }
  `);

  useEffect(() => {
    const extractedProducts:products.innerProductQueryData[] = homeQuery.products.edges;
    dispatch(storeAllProducts(extractedProducts));
    const tempProduct = [] as imageListImages[];
    extractedProducts.every((product) => {
      if (tempProduct.length < 25) {
        tempProduct.push({
          productImage: product.node.productImage[0],
          rows: parseInt(product.node.row, 10),
          cols: parseInt(product.node.column, 10),
        });
        return true;
      }
      return false;
    });
    setProductImages(tempProduct);
  }, [dispatch, homeQuery.products.edges]);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center" direction="column">
          <Typography variant="h4" color="secondary">Welcome!</Typography>
          <Typography variant="h6" className={styles.centerText}>Hello! Welcome to the path towards my Dream! YJ Art Journal!</Typography>
          <Typography variant="h6" className={styles.centerText}>You are very welcome to browse along and hope it will lighten up your day! Enjoy!</Typography>
          <Link component={GatsbyLink} to={routeNames.learnMore}>
            <Typography variant="subtitle1" color="secondary" className={styles.centerText}>ABOUT MY SHOP</Typography>
          </Link>
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
      <IconButton aria-label="more product images" onClick={() => navigate(routeNames.imageGallery)}>
        <ExpandMoreIcon />
      </IconButton>
    </Grid>
  );
};

export default HomeScreen;
