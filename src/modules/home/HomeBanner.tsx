import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage, ImageDataLike } from 'gatsby-plugin-image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import HomeCarouselImage from '../../styledComponents/home/HomeCarouselImage';

const useStyle = makeStyles((theme: Theme) => ({
  carouselContainerRoot: {
    paddingTop: 15,
    [theme.breakpoints.up('sm')]: {
      padding: 24,
      paddingBottom: 0,
    },
  },
}));

interface imageInnerStructure {
  node: {
    childImageSharp: ImageDataLike
    id: string
  }
}

const HomeBanner = () => {
  const styles = useStyle();
  const homeBannerQuery = useStaticQuery(graphql`
    query {
      allFile(filter: {relativeDirectory: {eq: "banner"}}) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            id
          }
        }
      }
    }
  `);

  return (
    <Carousel
      interval={5000}
      transitionTime={800}
      className={styles.carouselContainerRoot}
      autoPlay
      infiniteLoop
      showStatus={false}
      showThumbs={false}
    >
      {homeBannerQuery.allFile.edges.map((banner: imageInnerStructure) => {
        const bannerNode = banner.node;
        const bannerRealImageData = getImage(bannerNode.childImageSharp)!;
        return (
          <HomeCarouselImage
            image={bannerRealImageData}
            alt={bannerNode.id}
            key={bannerNode.id}
          />
        );
      })}
    </Carousel>
  );
};

export default HomeBanner;
