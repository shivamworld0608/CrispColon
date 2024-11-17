import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Profile from "../components/Profile";


const MyProfile = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Profile/> 
        <Footer />
      </div>
    </>
  );
};

export default MyProfile;
