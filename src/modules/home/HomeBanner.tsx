import { graphql, useStaticQuery } from 'gatsby';
import { getImage, ImageDataLike } from 'gatsby-plugin-image';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import HomeCarousel from '../../styledComponents/home/HomeCarousel';
import HomeCarouselImage from '../../styledComponents/home/HomeCarouselImage';

interface imageInnerStructure {
  node: {
    childImageSharp: ImageDataLike
    id: string
  }
}

const HomeBanner = () => {
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
    <HomeCarousel
      interval={5000}
      transitionTime={800}
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
    </HomeCarousel>
  );
};

export default HomeBanner;
