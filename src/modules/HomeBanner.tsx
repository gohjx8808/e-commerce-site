import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  carouselImages: {
    [theme.breakpoints.up('sm')]: {
      borderRadius: 10,
    },
  },
  carouselNavWrapper: {
    '&:hover': {
      backgroundColor: '#FFFFFF60',
    },
  },
  productCarouselNavButton: {
    backgroundColor: 'transparent!important',
    color: 'black!important',
  },
  indicatorIcon: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem',
    },
    fontSize: '1rem',
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
      navButtonsWrapperProps={{ className: styles.carouselNavWrapper, style: {} }}
      navButtonsProps={{
        className: styles.productCarouselNavButton,
        style: {},
      }}
      animation="slide"
      interval={5000}
      timeout={800}
      IndicatorIcon={<FiberManualRecordIcon className={styles.indicatorIcon} aria-label="indicator" />}
      className={styles.carouselContainerRoot}
    >
      {homeBannerQuery.allFile.edges.map((banner:imageInnerStructure) => {
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
  );
};

export default HomeBanner;
