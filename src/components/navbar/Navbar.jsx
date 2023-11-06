/* eslint-disable react/prop-types */
import { AiFillCheckSquare } from "react-icons/ai";
import { IMAGES_DELETED } from "../../context/actionTypes";
import { useGalleryContext } from "../../hooks/useGalleryContext";

const Navbar = ({ selectedfiles }) => {
  const {dispatch} = useGalleryContext();

  //handle delete selected items
  const handleDelete = () => {
    dispatch({
      type: IMAGES_DELETED,
    })
  }
  return (
    <div className="container-x py-3 h-14 border-b border-gray-400 shadow-sm">
      <div className="flex justify-between align-middle mb-2">
        {selectedfiles && selectedfiles > 0 ? (
          <div className="flex justify-center items-center">
            <AiFillCheckSquare className="text-blue-700 text-2xl mr-2" />
            <p className="font-semibold text-sm md:text-xl lg:text-2xl">
              {selectedfiles} Files Selected
            </p>
          </div>
        ) : (
          <h2 className="font-semibold text-sm md:text-xl lg:text-2xl">
            Gallery
          </h2>
        )}
        {selectedfiles > 0 && (
          <p onClick={handleDelete} className="text-red-700 hover:text-red-600 text-xl font-medium cursor-pointer">Delte files</p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
