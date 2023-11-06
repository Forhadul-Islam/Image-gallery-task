/* eslint-disable no-undef */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useState } from "react";
import { TOGGLE_SELECT_IMAGE } from "../../context/actionTypes";
import { useGalleryContext } from "../../hooks/useGalleryContext";
import Checkbosx from "../ui/Checkbosx";

export const Image = forwardRef(
  ({ url, index, faded, style, image, ...props }, ref) => {
    const inlineStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      height: index === 0 ? 375 : 175,
      gridRowStart: index === 0 ? "span 2" : null,
      gridColumnStart: index === 0 ? "span 2" : null,
      backgroundImage: `url("${url}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      // border: "1px solid gray",
      ...style,
    };

    const [selected, setSelected] = useState(false);
    const { state, dispatch } = useGalleryContext();
    const isSelected = state.selectedImages
      ?.map((file) => file.id)
      .includes(image?.id);

    const handleSelect = () => {
      setSelected((pre) => !pre);
      dispatch({ type: TOGGLE_SELECT_IMAGE, payload: image });
    };

    // return <div ref={ref} style={inlineStyles} {...props} />;
    return (
      <div
        ref={ref}
        style={inlineStyles}
        {...props}
        className="relative overflow-hidden cursor-pointer group "
      >
        <div
          className={`${
            isSelected ? "" : "group-hover:blur-[2px]"
          } transition-all duration-300 ease-out border border-gray-300 rounded-md`}
        />
        <div
          className={`${
            isSelected
              ? " opacity-60 bg-black/30"
              : " group-hover:scale-100 group-hover:opacity-100 bg-black/40"
          } inset-0 absolute  opacity-0 scale-100 transition-all duration-300 ease-out`}
        >
          <Checkbosx selected={isSelected} handleSelect={handleSelect} />
        </div>
      </div>
    );
  }
);
