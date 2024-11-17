import Navbar from "../components/Navbar";
import Model from "../components/Model";
import Footer from "../components/Footer";



const model = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Model />
        <Footer />
      </div>
    </>
  );
};

export default model;