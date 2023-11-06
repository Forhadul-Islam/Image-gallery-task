import { useContext } from "react";
import { GalleryContext } from "../context/gallery/GalleryProvider";

export const useGalleryContext = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error("useGalleryContext must be used within a GalleryProvider");
  }
  return context;
};
