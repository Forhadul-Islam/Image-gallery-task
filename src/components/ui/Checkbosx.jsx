/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { AiFillCheckSquare } from "react-icons/ai";

const Checkbosx = ({ selected, handleSelect }) => {
  return (
    <>
      {
        selected ? <AiFillCheckSquare onClick={handleSelect} className="ml-2 mt-2 z-50 hover:text-blue-800 text-blue-700 bg-white/50 text-3xl mr-2 cursor-pointer" />
        :<div onClick={handleSelect} className="ml-2 mt-2 bg-white h-6 w-6 cursor-pointer" />
      }
    </>
  );
};

export default Checkbosx;
