import Dialog from "@mui/material/Dialog";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

interface enlargedImageModalProps {
  selectedProductImage: IGatsbyImageData | null;
  setSelectedProductImage: (value: IGatsbyImageData | null) => void;
}

const EnlargedImageModal = (props: enlargedImageModalProps) => {
  const { selectedProductImage, setSelectedProductImage } = props;

  return (
    <Dialog
      open={!!selectedProductImage}
      onClose={() => setSelectedProductImage(null)}
    >
      {selectedProductImage && (
        <GatsbyImage image={selectedProductImage} alt="" />
      )}
    </Dialog>
  );
};

export default EnlargedImageModal;
