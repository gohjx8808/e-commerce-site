import { getRequest } from "@utils/apiUtils";

// eslint-disable-next-line import/prefer-default-export
export const getImageGalleryImages = () =>
  getRequest<imageGallery.imageGalleryData[]>("products/imageGallery");
