/* eslint-disable react/prop-types */

import { useState } from "react";
import { TOGGLE_SELECT_IMAGE } from "../../context/actionTypes";
import { useGalleryContext } from "../../hooks/useGalleryContext";
import Checkbosx from "../ui/Checkbosx";

const ImageCard = ({ image }) => {
  const [selected, setSelected] = useState(false);
  const { state, dispatch } = useGalleryContext();
  const isSelected = state.selectedImages
    ?.map((file) => file.id)
    .includes(image?.id);

  const handleSelect = () => {
    setSelected((pre) => !pre);
    dispatch({ type: TOGGLE_SELECT_IMAGE, payload: image });
  };
  return (
    <div className="relative overflow-hidden cursor-pointer group ">
      <img
        className={`${
          isSelected ? "" : "group-hover:blur-[2px]"
        } transition-all duration-300 ease-out border border-gray-300 rounded-md`}
        src={image?.url}
        alt="images"
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
};

export default ImageCard;
