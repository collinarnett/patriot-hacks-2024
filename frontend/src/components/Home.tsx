import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData | null>>;
}

const Home: React.FC<HomeProps> = ({ setFormData }) => {
  const navigate = useNavigate();

  const captureImage = () => {
    // Simulating image capture
    //const capturedImage = '/api/placeholder/400/300';
    setFormData(new FormData());
    navigate('/display');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Image Capture</h1>
      <button 
        onClick={captureImage}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Capture Image
      </button>
    </div>
  );
};

export default Home;