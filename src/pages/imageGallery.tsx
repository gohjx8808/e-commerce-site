import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { graphql, useStaticQuery } from "gatsby";
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import EnlargedImageModal from "../modules/imageGallery/views/EnlargedImageModal";

interface productImagesContentfulStructure {
  allContentfulGallery: {
    edges: productImageCategoryData[];
  };
}

interface productImageCategoryData {
  node: {
    column: number;
    row: number;
    productPhoto1: imageData[];
  };
}

interface imageData {
  id: string;
  gatsbyImageData: ImageDataLike;
}

interface targetImage {
  image: ImageDataLike;
  id: string;
  row: number;
  col: number;
}

const ImageGallery = () => {
  const [allProductImages, setAllProductImages] = useState<targetImage[]>([]);
  const [selectedProductImage, setSelectedProductImage] =
    useState<IGatsbyImageData | null>(null);

  const images: productImagesContentfulStructure = useStaticQuery(graphql`
    query ProductImages {
      allContentfulGallery(filter: { node_locale: { eq: "en-US" } }) {
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
    }
  `);

  useEffect(() => {
    const contentfulImages = images.allContentfulGallery.edges;
    const tempRegularProductImages: targetImage[] = [];
    const tempLargeProductImages: targetImage[] = [];
    const tempProductImages: targetImage[] = [];

    contentfulImages.map((imageCategory) => {
      const imageCategoryData = imageCategory.node;
      imageCategoryData.productPhoto1.map((image) => {
        if (imageCategoryData.row === 1) {
          const sameImageFound = tempRegularProductImages.some(
            (tempImage) => tempImage.id === image.id
          );
          if (!sameImageFound) {
            tempRegularProductImages.push({
              image: image.gatsbyImageData,
              id: image.id,
              row: imageCategoryData.row,
              col: imageCategoryData.column,
            });
          }
        } else {
          const sameImageFound = tempLargeProductImages.some(
            (tempImage) => tempImage.id === image.id
          );
          if (!sameImageFound) {
            tempLargeProductImages.push({
              image: image.gatsbyImageData,
              id: image.id,
              row: imageCategoryData.row,
              col: imageCategoryData.column,
            });
          }
        }
        return null;
      });
      return null;
    });
    tempLargeProductImages.sort(() => Math.random() - 0.5);
    tempRegularProductImages.sort(() => Math.random() - 0.5);
    while (
      tempLargeProductImages.length > 0 ||
      tempRegularProductImages.length > 0
    ) {
      const tempArr = [
        tempLargeProductImages.pop()!,
        ...tempRegularProductImages.splice(0, 6),
      ];
      tempArr.sort(() => Math.random() - 0.5);
      if (tempArr.length > 5) {
        const largeProductIndex = tempArr.findIndex((image) => image.row > 1);
        if (largeProductIndex > 3) {
          const randomIndexToReplace = Math.floor(Math.random() * 4);
          const temp = tempArr[randomIndexToReplace];
          tempArr[randomIndexToReplace] = tempArr[largeProductIndex];
          tempArr[largeProductIndex] = temp;
        }
      }
      tempProductImages.push(...tempArr);
    }
    setAllProductImages(tempProductImages);
  }, [images.allContentfulGallery.edges]);

  const handleImageClick = (image: IGatsbyImageData) => {
    setSelectedProductImage(image);
  };

  return (
    <MainLayout>
      <Grid item xs={12}>
        <Box paddingTop={1}>
          <ImageList rowHeight="auto" cols={5} variant="quilted">
            {allProductImages.map((image) => {
              const productImagesData = getImage(image.image)!;
              return (
                <ImageListItem
                  key={image.id}
                  sx={{ cursor: "zoom-in" }}
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
        <EnlargedImageModal
          selectedProductImage={selectedProductImage}
          setSelectedProductImage={setSelectedProductImage}
        />
      </Grid>
    </MainLayout>
  );
};

export default ImageGallery;
