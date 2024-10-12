import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(0);

  const addImage = async () => {
    //
    // const file = event.target.files[0];
  };

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
      <div>
        <button onClick={addImage}>Add food image {image}</button>
      </div>

      {image != 0 && (
        <div>
          <button onClick={submitImage}>Submit</button>
        </div>
      )}
    </>
  );
}

export default App;
