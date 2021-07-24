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
import routeNames from '../utils/routeNames';

const useStyle = makeStyles({
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
  productCarouselImages: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  viewMoreBtn: {
    marginTop: 10,
  },
});

interface imageInnerStructure{
  node:{
    childImageSharp:ImageDataLike
    id:string
  }
}

const HomeScreen = () => {
  const [productImages, setProductImages] = useState<ImageDataLike[][]>([]);
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
      prices: allStripePrice(
        filter: { active: { eq: true } }
        sort: { fields: [unit_amount] }
      ) {
        edges {
          node {
            unit_amount
            unit_amount_decimal
            product {
              id
              images
              localFiles{
                childImageSharp{
                  gatsbyImageData
                }
              }
              name
              type
            }
            active
            currency
            id
          }
        }
      }
    }
  `);

  useEffect(() => {
    const extractedPrices:products.queryProductData[] = homeQuery.prices.edges;
    const tempProduct = [] as ImageDataLike[][];
    let i = 1;
    let abc = [] as ImageDataLike[];
    extractedPrices.forEach((price) => {
      const realPrice = price.node;
      const extractedProduct = realPrice.product;
      abc.push(extractedProduct?.localFiles[0]!);
      if (i % 4 === 0) {
        tempProduct.push(abc);
        abc = [];
      }
      i += 1;
    });
    if (abc.length > 0) {
      tempProduct.push(abc);
    }
    setProductImages(tempProduct);
  }, [homeQuery]);

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <Carousel
          navButtonsWrapperProps={{ className: styles.carouselNavWrapper, style: {} }}
          navButtonsProps={{
            className: '',
            style: { backgroundColor: 'transparent', color: 'black' },
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
          <Typography variant="h6" className={styles.unboldH6}>Hello, welcome to my little art journal!</Typography>
        </Grid>
        <Grid container className={styles.sectionContainer} direction="column">
          <Typography variant="h5" color="secondary">Product</Typography>
        </Grid>
      </Grid>
      <Carousel
        navButtonsWrapperProps={{ className: styles.carouselNavWrapper, style: {} }}
        navButtonsProps={{
          className: '',
          style: { backgroundColor: 'transparent', color: 'black' },
        }}
        animation="slide"
        interval={5000}
        timeout={700}
      >
        {productImages.map((imageList) => (
          <Grid container direction="row" justify="center" alignItems="center" key={imageList.toLocaleString()}>
            {imageList.map((image) => {
              const productImagesData = getImage(image)!;
              return (
                <Grid
                  item
                  xs={3}
                  className={styles.productCarouselImages}
                  key={productImagesData.images.fallback?.src}
                >
                  <GatsbyImage
                    image={productImagesData}
                    alt={productImagesData.images.fallback?.src!}
                    imgClassName={styles.carouselImages}
                  />
                </Grid>
              );
            })}
          </Grid>
        ))}
      </Carousel>
      <Button variant="contained" color="primary" className={styles.viewMoreBtn} onClick={() => navigate(routeNames.products)}>View More</Button>
    </Grid>
  );
};

export default HomeScreen;
