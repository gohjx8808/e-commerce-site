import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
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
        <Carousel>
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
      </Grid>

    </Grid>
  );
};

export default HomeScreen;
