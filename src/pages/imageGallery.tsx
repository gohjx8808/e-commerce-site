import { useImageGalleryImages } from "@modules/imageGallery/src/imageGalleryQueries";
import SEO from "@modules/SEO";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { generateHeader } from "@utils/helper";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import EnlargedImageModal from "../modules/imageGallery/views/EnlargedImageModal";

const ImageGallery = () => {
  const [selectedProductImage, setSelectedProductImage] =
    useState<products.productImageData | null>(null);

  const { data: contentfulImages } = useImageGalleryImages();

  const handleImageClick = (image: products.productImageData) => {
    setSelectedProductImage(image);
  };

  return (
    <MainLayout>
      <Grid item xs={12}>
        <Box paddingTop={1}>
          {!contentfulImages ? (
            <Grid
              container
              display="flex"
              minHeight="100vh"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress color="primary" size={60} />
            </Grid>
          ) : (
            <ImageList rowHeight="auto" cols={5} variant="quilted">
              {contentfulImages.map((imageDetails) => (
                <ImageListItem
                  key={imageDetails.image.filename}
                  sx={{ cursor: "zoom-in" }}
                  rows={imageDetails.row}
                  cols={imageDetails.column}
                  onClick={() => handleImageClick(imageDetails.image)}
                >
                  <img
                    src={imageDetails.image.url}
                    alt={imageDetails.image.filename}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
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

export const Head = () => <SEO title={generateHeader("Image Gallery")} />;
