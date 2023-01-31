import { ProductContext } from "@contextProvider/ProductContextProvider";
import Box from "@mui/material/Box";
import ProductImage from "@styledComponents/products/ProductImage";
import React, { useContext, useState } from "react";
import { Carousel } from "react-responsive-carousel";

interface ProductImageCarouselProps {
  imageList: products.productImageData[];
  autoPlay?: boolean;
  card?: boolean;
}

const ProductImageCarousel = (props: ProductImageCarouselProps) => {
  const { imageList, autoPlay, card } = props;
  const [clickedIndex, setClickedIndex] = useState<number>(0);

  const { updateEnlargedImageCarouselData } = useContext(ProductContext);

  const triggerEnlargeImage = () => {
    updateEnlargedImageCarouselData({
      imageList,
      clickedIndex,
    });
  };

  const onChangeIndex = (index: number) => {
    setClickedIndex(index);
  };

  return (
    <Carousel
      showIndicators={false}
      infiniteLoop
      animationHandler="fade"
      showThumbs={false}
      showStatus={false}
      transitionTime={800}
      interval={5000}
      onClickItem={triggerEnlargeImage}
      autoPlay={autoPlay}
      onChange={onChangeIndex}
    >
      {imageList.map((image) => (
        <Box sx={{ cursor: "zoom-in" }} key={image.filename}>
          <ProductImage
            src={image.url}
            alt={image.filename}
            card={card}
            loading="lazy"
          />
        </Box>
      ))}
    </Carousel>
  );
};

export default ProductImageCarousel;

ProductImageCarousel.defaultProps = {
  autoPlay: false,
  card: false,
};
