import { getImage, ImageDataLike } from "gatsby-plugin-image";
import { Carousel } from "react-responsive-carousel";
import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { ProductContext } from "@contextProvider/ProductContextProvider";
import ProductImage from "@styledComponents/products/ProductImage";

interface ProductImageCarouselProps {
  imageList: ImageDataLike[];
  productName: string;
  autoPlay?: boolean;
  card?: boolean;
}

const ProductImageCarousel = (props: ProductImageCarouselProps) => {
  const { imageList, productName, autoPlay, card } = props;
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
      {imageList.map((image) => {
        const imageData = getImage(image)!;
        return (
          <Box sx={{ cursor: "zoom-in" }} key={imageData.images.fallback?.src}>
            <ProductImage image={imageData} alt={productName} card={card} />
          </Box>
        );
      })}
    </Carousel>
  );
};

export default ProductImageCarousel;

ProductImageCarousel.defaultProps = {
  autoPlay: false,
  card: false,
};
