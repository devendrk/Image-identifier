import React, { useState, useEffect } from "react";

import styles from "./App.module.css";
import Button from "./components/Button/Button";
import ImageContent from "./components/ImageContent/ImageContent";

import { storage, database } from "./firebase";

function App() {
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageContents, setImageContents] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleGetImageContent();
    }, 2500);
    return () => clearTimeout(timer);
  }, [imgUrl]);

  const onChange = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile) {
      setImage(imgFile);
    }
  };

  const handleImageUpload = () => {
    const uploadImage = storage.ref(image.name).put(image);
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
          .ref()
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setImgUrl(url);
          });
      }
    );
  };

  // Fetch Json result image contents from database
  const handleGetImageContent = () => {
    imgUrl &&
      database
        .ref("/JsonResponse")
        .once("value")
        .then((snapshot) => {
          setImageContents(snapshot.val());
        });
  };

  const renderResult = () => {
    return (
      imageContents &&
      imageContents.map((img) => (
        <ImageContent content={img.name} key={img.mid} />
      ))
    );
  };
  return (
    <div className={styles.main}>
      <img
        src={imgUrl || "https://via.placeholder.com/200X200"}
        alt="tasbir"
        width="150"
        height="150"
      />
      {progress > 0 ? (
        <progress value={progress} max="100" className={styles.progress} />
      ) : (
        <p>Upload image to see the magic</p>
      )}
      <div className={styles.chooseFile}>
        <input
          type="file"
          onChange={onChange}
          className={styles.inputFile}
          accept="image/*"
        />
        <Button
          label="Upload"
          btnType="primary"
          onClick={image && handleImageUpload}
        />
      </div>

      {imgUrl && !imageContents ? (
        <p>Cannot Identified image, please try another :) </p>
      ) : (
        <div className={styles.imageContents}>{renderResult()}</div>
      )}
    </div>
  );
}

export default App;
