import { ProductContext } from "@contextProvider/ProductContextProvider";
import Dialog from "@mui/material/Dialog";
import React, { useContext } from "react";
import { Carousel } from "react-responsive-carousel";

const EnlargedProductImageCarouselModal = () => {
  const { enlargedImageCarouselData, updateEnlargedImageCarouselData } =
    useContext(ProductContext);

  return (
    <Dialog
      open={enlargedImageCarouselData.imageList.length > 0}
      onClose={() =>
        updateEnlargedImageCarouselData({ imageList: [], clickedIndex: 0 })
      }
    >
      <Carousel
        showIndicators={false}
        showStatus={false}
        autoPlay={false}
        showThumbs={false}
        animationHandler="fade"
        selectedItem={enlargedImageCarouselData.clickedIndex}
        infiniteLoop
        transitionTime={800}
      >
        {enlargedImageCarouselData.imageList.map((image) => (
          <img key={image.filename} src={image.url} alt={image.filename} />
        ))}
      </Carousel>
    </Dialog>
  );
};

export default EnlargedProductImageCarouselModal;
