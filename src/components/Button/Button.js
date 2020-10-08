import React from "react";
import cx from "classnames";

import styles from "./Button.module.css";

const Button = ({ onClick, btnType, label }) => {
  return (
    <button
      type="button"
      className={cx(styles.button, styles[btnType])}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
