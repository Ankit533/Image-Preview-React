import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const fileInputRef = useRef();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);
  return (
    <div className="App">
      {preview ? (
        <div className="text-center">
          <h3 className="text-white">Click on image to remove image</h3>
          <img
            src={preview}
            className="App-logo"
            alt="user"
            onClick={() => {
              setFile(null);
            }}
          />
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-white">Add image to preview</h3>
          <button
            className="upload-btn"
            onClick={(event) => {
              event.preventDefault();
              fileInputRef.current.click();
            }}
          >
            Click to add
          </button>
        </div>
      )}
      <input
        style={{ display: "none" }}
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files[0];
          if (file && file.type.substring(0, 5) === "image") {
            setFile(file);
          } else {
            setFile(null);
          }
        }}
      />
    </div>
  );
}

export default App;
