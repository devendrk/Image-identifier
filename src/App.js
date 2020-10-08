import React, { useState, useEffect } from "react";

import styles from "./App.module.css";
import Button from "./components/Button/Button";
import ImageContent from "./components/ImageContent/ImageContent";

import { storage, database } from "./firebase";

function App() {
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [Error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageContents, setImageContents] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 1 second!");
      handleGetImageContent();
    }, 3000);
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
        setError("Some thing went wrong, Try another image");
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

  // Get Json result image contents from database
  const handleGetImageContent = () => {
    imgUrl &&
      database
        .ref("/JsonResponse")
        .once("value")
        .then((snapshot) => {
          setImageContents(snapshot.val());
        });
  };
  console.log("url", imgUrl);
  console.log("image contenttt", imageContents);

  const renderResult = () => {
    return (
      imageContents &&
      imageContents.map((img) => {
        return <ImageContent content={img.name} key={img.mid} />;
      })
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
      {progress > 0 && (
        <progress value={progress} max="100" className={styles.progress} />
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
      <div className={styles.imageContentsHeader}>
        <h4>Image contents</h4>
        <div className={styles.imageContents}>
          {imgUrl && !imageContents ? (
            <p>cannot Identified image, please try another</p>
          ) : (
            renderResult()
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
