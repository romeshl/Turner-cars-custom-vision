import React, { useState } from "react";
import CustomVision from "./Components/CustomVision";

function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  function handleChange(e) {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setFile(URL.createObjectURL(e.target.files[0]));
    }

  }

  function handleClick(e) {
    setImage();
    setFile(null);
  }

  return (
    <div className="font-mono w-[80%] max-w-[1200px] border-2 mx-[auto] rounded-3xl bg-blue-50 border-blue-900 mt-[100px] pt-[50px] p-[30px] gap-xl">
      <h1 className="text-blue-800 font-bold text-xl text-center underline mb-[30px]">Turner Car Insurance - Vehicle Type Detector Prototype</h1>
      <h2 className="font-bold">Add Image:</h2>
      <input className="text-blue-700 mb-[30px]" type="file" onChange={handleChange} onClick={handleClick} />
      {image && <img className="w-[80%] mx-auto border-2  border-blue-300 rounded-xl mb-[50px]" src={file} />}
      
      {image && <CustomVision image={image} /> }
    </div>
  );
}

export default App;