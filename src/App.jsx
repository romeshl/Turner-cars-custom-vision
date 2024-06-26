// Importing necessary React hooks and CustomVision component
import React, { useState } from "react";
import CustomVision from "./Components/CustomVision";

// Main App component
function App() {
  // State for storing the file object and its URL for display
  const [file, setFile] = useState();
  // State for storing the selected image file
  const [image, setImage] = useState();

  // Handles file selection and updates state with the file and its URL
  const handleChange = (e) => {
    // Check if any file is selected
    if (e.target.files.length > 0) {
      // Update image state with the selected file
      setImage(e.target.files[0]);
      // Create and set the URL for the selected file for displaying the image
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  // Resets the image and file states, effectively clearing the selection
  function handleClick(e) {
    setImage(null);
    setFile(null);
  }

  // Rendering the UI of the App component
  return (
    <div className="font-mono w-[80%] max-w-[1200px] border-2 mx-[auto] rounded-3xl bg-blue-50 border-blue-900 mt-[100px] pt-[50px] p-[30px] gap-xl">
      {/* Title of the application */}
      <h1 className="text-blue-800 font-bold text-xl text-center underline mb-[30px]">Turner Car Insurance - Vehicle Type Detector Prototype</h1>
      {/* Input field for adding an image */}
      <h2 className="font-bold">Add Image:</h2>
      <input className="text-blue-700 mb-[30px]" type="file" onChange={handleChange} onClick={handleClick} />
      {/* Display the selected image if any */}
      {image && <img className="w-[80%] mx-auto border-2  border-blue-300 rounded-xl mb-[50px]" src={file} />}
      {/* Invoke the CustomVision component with the selected image if any */}
      {image && <CustomVision image={image} />}
    </div>
  );
}

// Exporting the App component for use in other parts of the application
export default App;