/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { toggleSelectImage } from "../../helpers/actions";
import { useGalleryContext } from "../../hooks/useGalleryContext";
import Checkbosx from "../ui/Checkbosx";

export const GridCardItem = forwardRef(
  (
    { url, index, faded, style, image, listeners, attributes, ...props },
    ref
  ) => {
    const inlineStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      gridRowStart: index === 0 ? "span 2" : null,
      gridColumnStart: index === 0 ? "span 2" : null,
      backgroundSize: "cover",
      backgroundPosition: "center",
      ...style,
    };

    const { state, dispatch } = useGalleryContext();

    //find is image selected or not
    const isSelected = state.selectedImages
      ?.map((file) => file.id)
      .includes(image?.id);

    const handleSelect = (e) => {
      e.stopPropagation();
      dispatch(toggleSelectImage(image));
    };

    return (
      <div
        ref={ref}
        style={inlineStyles}
        {...props}
        className="relative overflow-hidden cursor-pointer  "
      >
        <div {...attributes} {...listeners} className="group">
          <img
            className={`${
              isSelected ? "" : "group-hover:blur-[2px]"
            } transition-all duration-300 ease-out border border-gray-300 rounded-md z-30`}
            src={image?.url}
            alt="images"
          />
          <div
            className={`${
              isSelected
                ? " opacity-60 bg-black/30"
                : " group-hover:scale-100 group-hover:opacity-100 bg-black/40"
            } inset-0 absolute  opacity-0 scale-100 transition-all duration-300 ease-out z-40`}
          />
          <div className="absolute  top-0 left-0 z-50">
            <Checkbosx
              className=""
              selected={isSelected}
              handleSelect={handleSelect}
            />
          </div>
        </div>
      </div>
    );
  }
);
