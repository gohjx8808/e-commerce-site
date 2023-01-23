import { getRequest } from "@utils/apiUtils";

// eslint-disable-next-line import/prefer-default-export
export const getImageGalleryImages = () =>
  getRequest<Response<imageGallery.imageGalleryData[]>>("products/image-gallery");
