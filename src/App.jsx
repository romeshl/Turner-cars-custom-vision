// Importing necessary React hooks and CustomVision component
import React, { useState, useEffect } from "react";
import CustomVision from "./Components/CustomVision";

import icon from "./assets/ai.jpg";

// Main App component
function App() {
  // State for storing the file object and its URL for display
  const [file, setFile] = useState();
  // State for storing the selected image file
  const [image, setImage] = useState();
  // State for controlling the display of the CustomVision component and image
  const [showImage, setShowImage] = useState(false);
  
  // Setting the favicon and title of the application
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = icon;
    document.title = "Turner Car Insurance - Vehicle Type Detector Prototype";
  }, []);

  // Handles file selection and updates state with the file and its URL
  const handleChange = (e) => {
    // Check if any file is selected
    if (e.target.files.length > 0) {
      // Update image state with the selected file
      setImage(e.target.files[0]);
      // Create and set the URL for the selected file for displaying the image
      setFile(URL.createObjectURL(e.target.files[0]));
      // Display the CustomVision component and img holding the image
      setShowImage(true);
    }
  }

  // Hides the CustomVision component and img holding the image
  function handleClick(e) {
    // Clears the input field value
    e.target.value = null;
    // Hides the CustomVision component and img holding the image
    setShowImage(false);
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
      {showImage && <img className="w-[80%] mx-auto border-2  border-blue-300 rounded-xl mb-[50px]" src={file} />}
      {/* Invoke the CustomVision component with the selected image if any */}
      {showImage && <CustomVision image={image} />}
    </div>
  );
}

// Exporting the App component for use in other parts of the application
export default App;