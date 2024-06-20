
// Filename - App.js

import React, { useState } from "react";
import CustomVision from "./Components/CustomVision";


function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  function handleChange(e) {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setFile(URL.createObjectURL(e.target.files[0]));
      //sendImageToApi();
    }

  }

  function handleClick(e) {
    setImage();
    setFile(null);
    console.log("Image is");
    console.log(image);
  }


  return (
    <div className="App">
      <h2>Add Image:</h2>
      <input type="file" onChange={handleChange} onClick={handleClick} />
      <img src={file} />
      {image && <CustomVision image={image} /> }
    </div>
  );
}

export default App;