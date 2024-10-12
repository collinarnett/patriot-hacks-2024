import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const Home: React.FC<HomeProps> = ({ setImage }) => {
  const navigate = useNavigate();

  const captureImage = () => {
    // Simulating image capture
    const capturedImage = '/api/placeholder/400/300';
    setImage(capturedImage);
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