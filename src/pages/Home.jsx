import ImageGallery from "../components/grid/ImageGallery";
import Navbar from "../components/navbar/Navbar";
import { useGalleryContext } from "../hooks/useGalleryContext";

const Home = () => {
  const {state:{ selectedImages}} = useGalleryContext()
  return (
    <div className="container shadow-sm">
      <Navbar selectedfiles={selectedImages?.length} />
      <div className="container-x my-8">
        <ImageGallery />
      </div>
    </div>
  );
};

export default Home;
