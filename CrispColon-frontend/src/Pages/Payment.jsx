import Navbar from "../components/Navbar";
import Payment from "../components/Payment";
import Footer from "../components/Footer";



const payment = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Payment />
        <Footer />
      </div>
    </>
  );
};

export default payment;