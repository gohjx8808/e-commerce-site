import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage, ImageDataLike } from 'gatsby-plugin-image';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import HomeCarouselImage from './styledComponents/HomeCarouselImage';

const useStyle = makeStyles((theme:Theme) => ({
  carouselNavWrapper: {
    '&:hover': {
      backgroundColor: '#FFFFFF60',
    },
  },
  productCarouselNavButton: {
    backgroundColor: 'transparent!important',
    color: 'black!important',
  },
  carouselContainerRoot: {
    paddingTop: 15,
    [theme.breakpoints.up('sm')]: {
      padding: 24,
      paddingBottom: 0,
    },
  },
}));

interface imageInnerStructure{
  node:{
    childImageSharp:ImageDataLike
    id:string
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
      navButtonsWrapperProps={{ className: styles.carouselNavWrapper }}
      navButtonsProps={{ className: styles.productCarouselNavButton }}
      animation="slide"
      interval={5000}
      timeout={800}
      IndicatorIcon={<FiberManualRecordIcon fontSize="small" aria-label="indicator" />}
      className={styles.carouselContainerRoot}
    >
      {homeBannerQuery.allFile.edges.map((banner:imageInnerStructure) => {
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
