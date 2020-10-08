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
  useEffect(() => {
    handleGetImageContent();
  }, [imgUrl]);
  const handleGetImageContent = () => {
    database
      .ref("/JsonResponse")
      .once("value")
      .then((snapshot) => {
        setImageContents(snapshot.val());
      });
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
        <input type="file" onChange={onChange} className={styles.inputFile} />
        <Button
          label="Upload"
          btnType="primary"
          onClick={image && handleImageUpload}
        />
      </div>
      <div className={styles.imageContentsHeader}>
        <h4>Image contents</h4>
        <div className={styles.imageContents}>
          {imageContents &&
            imageContents.map((img) => {
              console.log(img.name);
              return <ImageContent content={img.name} key={img.mid} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
