import React from "react";
import styles from "../../styles/Atoms.module.css";

export default function Button({
  children,
  variant = "contained",
  onClick,
  size = "medium",
  ...rest
}) {
  const variants = {
    contained: {
      backgroundColor: "#2A3958",
      color: "#ffffff",
      borderColor: "#2A3958",
    },
    outlined: {
      backgroundColor: "#ffffff",
      color: "#2A3958",
      borderColor: "#2A3958",
    },
    solid: {
      backgroundColor: "#EBEEF3",
      color: "#222222",
      borderColor: "#D7D8DA",
    },
  };

  const sizes = {
    flex: { width: "100%" },
    small: {
      height: "25px",
      width: "50px",
      fontWeight: "500",
      fontSize: "10px",
    },
    medium: { width: "85px" },
  };
  return (
    <button
      style={{ ...variants[variant], ...sizes[size] }}
      onClick={onClick}
      {...rest}
      className={styles.button}
    >
      {children}
    </button>
  );
}
