import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../Redux/authSlice";

const Model = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [sendImage, setSendImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Loading state
  const [prediction, setPrediction] = useState(null);

  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSendImage(e.target.files[0]);
      setSelectedImage(URL.createObjectURL(e.target.files[0])); // Preview image
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file", sendImage);
    console.log(formData);

    setIsUploading(true); // Show loading indicator

    try {
        await toast.promise(
          axios.post(`${import.meta.env.REACT_APP_BASE_URL}/api/upload`, formData, { withCredentials: true }),
          {
            loading: 'Uploading image...',
            success: "Image uploaded successfully!",
            error: "Image upload failed",
          }
        ).then((response) => {
          dispatch(setAuthUser({ authUser: true, userData: response.data.user }));
           const x = JSON.parse(response.data.prediction);
          setPrediction(x);
          setUploadSuccess(true);
          console.log("Image uploaded successfully");
        });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false); // Hide loading indicator
    }
  };

  return (
    <div className="flex flex-col items-center mt-1 lg:mt-2 p-4">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide mb-6">
        Colon Cancer Detection
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}Model
        </span>
      </h1>
      
      <p className="text-lg text-center text-neutral-500 max-w-4xl mb-10">
        Detecting Colon Cancer Early, Because Every Second Counts.
        Your Partner in Lifesaving Innovation.
      </p>

      {/* Image preview section */}
      {selectedImage && (
        <div className="w-full max-w-xs h-auto mb-6">
          <img src={selectedImage} alt="Preview" className="rounded-lg shadow-md" />
        </div>
      )}

      {/* Image upload and buttons */}
      <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-sm">
        <label
          className="w-full flex flex-col items-center bg-white text-blue rounded-lg shadow-md border border-gray-300 cursor-pointer hover:bg-gray-200 py-4 mb-3"
        >
          <input type="file"  className="hidden" accept="image/*" onChange={handleImageUpload} />
          <span className="text-gray-600">Choose X-Ray</span>
        </label>

        <button
          onClick={uploadImage}
          className="w-full mt-2 tracking-wide font-semibold bg-gradient-to-r from-orange-500 to-orange-800 text-gray-100 py-2 rounded-lg flex items-center justify-center"
        >
          {isUploading ? "Uploading..." : "Upload X-Ray"}
        </button>

        {uploadSuccess && (
        <div className="space-y-3 mt-4 w-full">
           <div className="flex items-center justify-between">
             <p className="text-lg font-medium text-gray-600">Prediction:</p>
             <p className="ml-2 text-xl font-semibold text-green-500">{prediction.prediction}</p>
           </div>
       
           <div className="flex items-center justify-between">
             <p className="text-lg font-medium text-gray-600">Confidence:</p>
             <p className="text-xl font-semibold text-blue-500">{prediction.confidence}</p>
           </div>
       
           <div className="flex items-center justify-between">
             <p className="text-lg font-medium text-gray-600">Processing Time:</p>
             <p className="text-xl font-semibold text-purple-500">{prediction.processingTime}s</p>
           </div>
         </div>
        )}
      </div>
    </div>
  );
};

export default Model;
