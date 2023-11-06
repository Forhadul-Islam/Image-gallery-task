import {
    DND_UPDATE_IMAGES,
    IMAGES_DELETED,
    TOGGLE_SELECT_IMAGE,
} from "../context/actionTypes";

export const toggleSelectImage = (image) => {
  return {
    type: TOGGLE_SELECT_IMAGE,
    payload: image,
  };
};

export const imagesDeleted = () => {
  return {
    type: IMAGES_DELETED,
  };
};

export const imagesSorted = (sortedImageList) => {
  return {
    type: DND_UPDATE_IMAGES,
    payload: sortedImageList,
  };
};
