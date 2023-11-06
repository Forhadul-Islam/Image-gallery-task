import { BsCardImage } from 'react-icons/bs'
const AddImages = () => {
  return (
        <div className='cursor-pointer flex flex-col justify-center items-center border-2 border-dashed border-gray-500/60 hover:border-gray-500 transition-all decoration-neutral-50 rounded-md'>
        <BsCardImage />
        <p>Add Images</p>
        </div>
  )
}

export default AddImages