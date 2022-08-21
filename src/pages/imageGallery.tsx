import { useImageGalleryImages } from "@modules/imageGallery/src/imageGalleryQueries";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import EnlargedImageModal from "../modules/imageGallery/views/EnlargedImageModal";

const ImageGallery = () => {
  const [allProductImages, setAllProductImages] = useState<
    imageGallery.imageGalleryData[]
  >([]);
  const [selectedProductImage, setSelectedProductImage] =
    useState<products.productImageData | null>(null);

  const { data: contentfulImages } = useImageGalleryImages();

  useEffect(() => {
    const tempRegularProductImages: imageGallery.imageGalleryData[] = [];
    const tempLargeProductImages: imageGallery.imageGalleryData[] = [];
    const tempProductImages: imageGallery.imageGalleryData[] = [];

    if (contentfulImages) {
      contentfulImages.map((imageDetails) => {
        if (imageDetails.row === 1) {
          tempRegularProductImages.push(imageDetails);
        } else {
          tempLargeProductImages.push(imageDetails);
        }
        return null;
      });
    }
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
  }, [contentfulImages]);

  const handleImageClick = (image: products.productImageData) => {
    setSelectedProductImage(image);
  };

  return (
    <MainLayout>
      <Grid item xs={12}>
        <Box paddingTop={1}>
          <ImageList rowHeight="auto" cols={5} variant="quilted">
            {allProductImages.map((imageDetails) => (
              <ImageListItem
                key={imageDetails.image.filename}
                sx={{ cursor: "zoom-in" }}
                rows={imageDetails.row}
                cols={imageDetails.col}
                onClick={() => handleImageClick(imageDetails.image)}
              >
                <img
                  src={imageDetails.image.url}
                  alt={imageDetails.image.filename}
                />
              </ImageListItem>
            ))}
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
