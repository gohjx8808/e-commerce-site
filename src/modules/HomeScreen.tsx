import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';
import {
  graphql, Link as GatsbyLink, navigate, useStaticQuery,
} from 'gatsby';
import {
  GatsbyImage, getImage, ImageDataLike,
} from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import { storeAllProducts } from './products/src/productReducers';
import routeNames from '../utils/routeNames';
import useGlobalStyles from '../useGlobalStyles';
import { useAppDispatch } from '../hooks';

const useStyle = makeStyles({
  imageList: {
    maxHeight: 450,
  },
});

interface imageListImages{
  productImage:ImageDataLike
  rows:number
  cols:number
}

const HomeScreen = () => {
  const [productImages, setProductImages] = useState<imageListImages[]>([]);
  const dispatch = useAppDispatch();
  const styles = useStyle();
  const globalStyles = useGlobalStyles();
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
    <Grid container justifyContent="center" alignItems="center" className={globalStyles.componentTopSpacing}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center" direction="column">
          <Typography variant="h4" color="secondary" className={globalStyles.componentQuarterBottomSpacing}>Welcome!</Typography>
          <Typography variant="h6" className={globalStyles.centerText}>Hello! Welcome to the path towards my Dream! YJ Art Journal!</Typography>
          <Typography variant="h6" className={clsx(globalStyles.centerText, globalStyles.componentQuarterBottomSpacing)}>You are very welcome to browse along and hope it will lighten up your day! Enjoy!</Typography>
          <Link component={GatsbyLink} to={routeNames.learnMore}>
            <Typography variant="subtitle1" color="secondary" className={globalStyles.centerText}>ABOUT MY SHOP</Typography>
          </Link>
        </Grid>
      </Grid>
      <Grid container className={clsx(globalStyles.componentTopSpacing, globalStyles.componentQuarterBottomSpacing)} direction="column">
        <Typography variant="h5" color="secondary">Product Gallery</Typography>
      </Grid>
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
      <IconButton aria-label="more product images" onClick={() => navigate(routeNames.imageGallery)}>
        <ExpandMoreIcon />
      </IconButton>
    </Grid>
  );
};

export default HomeScreen;
