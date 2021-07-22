import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { graphql, useStaticQuery } from 'gatsby';
import {
  GatsbyImage, getImage, ImageDataLike,
} from 'gatsby-plugin-image';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

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
});

interface bannerImageData{
  allFile:{
    edges:imageInnerStructure[]
  }
}

interface imageInnerStructure{
  node:{
    childImageSharp:ImageDataLike
    id:string
  }
}

const HomeScreen = () => {
  const styles = useStyle();
  const bannerImages:bannerImageData = useStaticQuery(graphql`
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
    }
  `);

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
          {bannerImages.allFile.edges.map((banner) => {
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
    </Grid>
  );
};

export default HomeScreen;
