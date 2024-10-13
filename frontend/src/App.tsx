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
            <button onClick={() => setImgSrc(null)}>Clear</button>
          </div>
          <div className="">
            <button
              className="mt-5 relative inline-flex items-center justify-center px-6 py-3 font-bold text-white uppercase transition-all duration-300 
              bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg 
              shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500 before:to-cyan-500 
              before:-z-10 before:blur-lg before:opacity-50 before:scale-110 before:transition-transform before:duration-300
              after:absolute after:inset-0 after:bg-gradient-to-r after:from-pink-500/50 after:to-pink-500/50 
              after:-z-20 after:scale-0 after:transition-transform after:duration-300 after:rounded-lg
              hover:after:scale-100 hover:before:scale-100 active:translate-y-1"
              onClick={submitImage}
            >
              Submit
            </button>
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
            <button
              className="mt-5 relative inline-flex items-center justify-center px-6 py-3 font-bold text-white uppercase transition-all duration-300 
              bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg 
              shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500 before:to-cyan-500 
              before:-z-10 before:blur-lg before:opacity-50 before:scale-110 before:transition-transform before:duration-300
              after:absolute after:inset-0 after:bg-gradient-to-r after:from-pink-500/50 after:to-pink-500/50 
              after:-z-20 after:scale-0 after:transition-transform after:duration-300 after:rounded-lg
              hover:after:scale-100 hover:before:scale-100 active:translate-y-1"
              onClick={capture}
            >
              CAPTURE
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
