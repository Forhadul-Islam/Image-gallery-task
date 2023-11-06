/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { galleryReducer, initialState } from "./galleryReducer";

// Create the GalleryContext
export const GalleryContext = createContext();

// Create a GalleryProvider component to wrap your app with
export const GalleryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(galleryReducer, initialState);

  return (
    <GalleryContext.Provider value={{ state, dispatch }}>
      {children}
    </GalleryContext.Provider>
  );
};
