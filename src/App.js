import React, { useState } from "react";
import "./App.css";
import { storage } from "./firebase";

function App() {
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  const onChange = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile) {
      setImage(imgFile);
    }
  };

  const HandleImageUpload = () => {
    const uploadImage = storage.ref(`images/${image.name}`).put(image);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setImgUrl(url);
          });
      }
    );
  };

  return (
    <div className="App">
      <progress value={progress} max="100" />
      <br />
      <input type="file" onChange={onChange} />
      <button onClick={HandleImageUpload}>Upload</button>
      <br />
      <img src={imgUrl || "https://via.placeholder.com/300X300"} alt="tasbir" />
    </div>
  );
}

export default App;
