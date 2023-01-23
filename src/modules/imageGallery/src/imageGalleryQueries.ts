import { useQuery } from "react-query";
import { getImageGalleryImages } from "./imageGalleryApis";

// eslint-disable-next-line import/prefer-default-export
export const useImageGalleryImages = () =>
  useQuery(
    "getImageGalleryImages",
    async () => (await getImageGalleryImages()).data.data
  );
