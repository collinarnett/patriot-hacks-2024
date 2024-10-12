import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ResultsProps {
  image: string | null;
}

const Results: React.FC<ResultsProps> = ({ image }) => {
  useEffect(() => {
    if (image === null) {
      console.log('Image is null');
    } else {
      console.log('Image is not null');
    }
  }, [image]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Captured Image</h1>
      {image ? (
        <img src={image} alt="Captured" className="max-w-full h-auto" />
      ) : (
        <p>No image captured yet</p>
      )}
      <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Home
      </Link>
    </div>
  );
};

export default Results;