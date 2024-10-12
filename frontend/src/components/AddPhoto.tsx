import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

interface HomeProps {
  setImage: (image: string) => void;
}

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
  
};

const AddPhoto: React.FC<HomeProps> = ({ setImage }) => {

  const webcamRef = useRef<Webcam | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
  }, [webcamRef]);

  const captureImage = async () => {};

  const submitImage = async () => {
    if (!image) {
      return;
    }
    let formData = new FormData();
    formData.append("file", image);
    let response = await fetch("http://localhost:3000/food", {
      method: "GET",
      body: formData,
    });
    if (response.status === 200) {
      // navigate(`/food/${foodName}`);
    }
  };

  return (
    <>
      <div></div>

      <div>
        <button onClick={captureImage}>Capture food image {image}</button>
      </div>

      {image != 0 && (
        <div>
          <button onClick={submitImage}>Submit</button>
        </div>
      )}
    </>
  );
}

export default AddPhoto;

