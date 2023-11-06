import { imagesData } from "../../constants";
import {
  DND_UPDATE_IMAGES,
  IMAGES_DELETED,
  TOGGLE_SELECT_IMAGE,
} from "../actionTypes";

export const initialState = {
  images: [...imagesData],
  selectedImages: [],
};

export const galleryReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    //toggle the image selecetion
    case TOGGLE_SELECT_IMAGE: {
      const index = state.selectedImages.findIndex(
        (item) => item.id === action.payload?.id
      );
      if (index !== -1) {
        return {
          ...state,
          selectedImages: state.selectedImages.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      } else {
        return {
          ...state,
          selectedImages: [...state.selectedImages, action.payload],
        };
      }
    }

    //remove all selected images
    case IMAGES_DELETED: {
      const removableId = state.selectedImages?.map((item) => item.id);
      const updatedImageList = state.images?.filter((image) =>!removableId?.includes(image.id));
      console.log({updatedImageList})
      return {
        ...state,
        images: updatedImageList,
        selectedImages: [],
      };
    }

    case DND_UPDATE_IMAGES:
      return {
        ...state,
        images: action.payload,
      };

    default:
      return state;
  }
};
