import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "./App.css";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment",
};

function App() {
  const webcamRef = useRef<Webcam | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc ?? null);
  }, [webcamRef]);

  const submitImage = async () => {
    let formData = new FormData();
    if (imgSrc) {
      formData.append("image", imgSrc);
      navigate("/results", { state: formData });
    }
  };

  return (
    <>
      {imgSrc ? (
        <div>
          <img src={imgSrc} />
          <div>
            <button onClick={submitImage}>Submit</button>
          </div>
          <div>
            <button onClick={() => setImgSrc(null)}>Clear</button>
          </div>
        </div>
      ) : (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            disablePictureInPicture={true}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <div>
            <button onClick={capture}>Capture photo</button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
