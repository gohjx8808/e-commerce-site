import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { graphql, useStaticQuery } from 'gatsby';
import {
  GatsbyImage, getImage, IGatsbyImageData, ImageDataLike,
} from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { toggleEnlargedImageModal, updateSelectedImage } from '../src/imageGalleryReducer';
import EnlargedImageModal from './EnlargedImageModal';

interface productImagesContentfulStructure{
  allContentfulGallery:{
    edges:productImageCategoryData[]
  }
}

interface productImageCategoryData{
  node:{
    column:number
    row:number
    productPhoto1:imageData[]
  }
}

interface imageData{
  id:string
  gatsbyImageData:ImageDataLike
}

interface targetImage{
  image:ImageDataLike
  id:string
  row:number
  col:number
}

const ImageGallery = () => {
  const [allProductImages, setAllProductImages] = useState<targetImage[]>([]);
  const dispatch = useAppDispatch();

  const images:productImagesContentfulStructure = useStaticQuery(graphql`
    query ProductImages {
      allContentfulGallery(filter: {node_locale: {eq: "en-US"}}) {
        edges {
          node {
            row
            column
            productPhoto1 {
              gatsbyImageData(placeholder: BLURRED)
              id
            }
          }
        }
      }
    }`);

  useEffect(() => {
    const contentfulImages = images.allContentfulGallery.edges;
    const tempProductImages:targetImage[] = [];

    contentfulImages.map((imageCategory) => {
      const imageCategoryData = imageCategory.node;
      imageCategoryData.productPhoto1.map((image) => {
        const sameImageFound = tempProductImages.some((tempImage) => tempImage.id === image.id);
        if (!sameImageFound) {
          tempProductImages.push({
            image: image.gatsbyImageData,
            id: image.id,
            row: imageCategoryData.row,
            col: imageCategoryData.column,
          });
        }
        return null;
      });
      return null;
    });
    tempProductImages.sort(() => Math.random() - 0.5);
    setAllProductImages(tempProductImages);
  }, [images.allContentfulGallery.edges]);

  const handleImageClick = (image:IGatsbyImageData) => {
    dispatch(updateSelectedImage(image));
    dispatch(toggleEnlargedImageModal(true));
  };

  return (
    <Grid item xs={12}>
      <Box paddingTop={1}>
        <ImageList rowHeight="auto" cols={5} variant="quilted">
          {allProductImages.map((image) => {
            const productImagesData = getImage(image.image)!;
            return (
              <ImageListItem
                key={image.id}
                sx={{ cursor: 'zoom-in' }}
                rows={image.row}
                cols={image.col}
              >
                <GatsbyImage
                  onClick={() => handleImageClick(productImagesData)}
                  image={productImagesData}
                  alt={image.id}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Box>
      <EnlargedImageModal />
    </Grid>
  );
};

export default ImageGallery;
