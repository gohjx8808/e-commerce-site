import Dialog from "@mui/material/Dialog";

interface enlargedImageModalProps {
  selectedProductImage: products.productImageData | null;
  setSelectedProductImage: (value: products.productImageData | null) => void;
}

const EnlargedImageModal = (props: enlargedImageModalProps) => {
  const { selectedProductImage, setSelectedProductImage } = props;

  return (
    <Dialog
      open={!!selectedProductImage}
      onClose={() => setSelectedProductImage(null)}
    >
      {selectedProductImage && (
        <img
          src={selectedProductImage.url}
          alt={selectedProductImage.filename}
        />
      )}
    </Dialog>
  );
};

export default EnlargedImageModal;
