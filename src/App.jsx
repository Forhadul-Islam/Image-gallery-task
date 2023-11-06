import "./App.css";
import { GalleryProvider } from "./context/gallery/GalleryProvider";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="app-container">
      {/* Here goes the pages of the applicaton */}
      <GalleryProvider>
        <Home />
      </GalleryProvider>
    </div>
  );
};

export default App;
