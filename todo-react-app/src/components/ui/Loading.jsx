import React from "react";
import "../../index.css";

export default function Loading() {
  return (
    <div style={styles.container}>
      <h3 style={styles.text}>잠시만 기다려주세요.</h3>
      <div style={styles.spinner}></div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "20px",
    color: "#333",
  },
  spinner: {
    border: "4px solid rgba(255, 255, 255, 0.3)",
    borderTop: "4px solid #F50057",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite",
    margin: "0 auto",
  },
};
