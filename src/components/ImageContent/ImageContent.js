import React from "react";
import styles from "./ImageContent.module.css";

const ImageContent = ({ content }) => {
  console.log("cccc", content);
  return (
    <>
      <p className={styles.content}>{content}</p>
    </>
  );
};

export default ImageContent;
