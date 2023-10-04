import React from "react";
import Button from "@material-ui/core/Button";
import { useTheme } from "../../context/ThemeContext";

export default function FilterButtons({ filter, handleFilter }) {
  const { darkMode } = useTheme();

  const buttonColor = darkMode ? "var(--dark-color)" : "var(--primary-color)";
  const buttonTextColor = "white";

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant={filter === "all" ? "contained" : "outlined"}
        color="primary"
        onClick={() => handleFilter("all")}
        style={{
          backgroundColor: filter === "all" ? buttonColor : "transparent",
          color: filter === "all" ? buttonTextColor : "inherit",
          marginRight: "8px",
        }}
      >
        All
      </Button>
      <Button
        variant={filter === "complete" ? "contained" : "outlined"}
        color="primary"
        onClick={() => handleFilter("complete")}
        style={{
          backgroundColor: filter === "complete" ? buttonColor : "transparent",
          color: filter === "complete" ? buttonTextColor : "inherit",
          marginRight: "8px",
        }}
      >
        Complete
      </Button>
      <Button
        variant={filter === "active" ? "contained" : "outlined"}
        color="primary"
        onClick={() => handleFilter("active")}
        style={{
          backgroundColor: filter === "active" ? buttonColor : "transparent",
          color: filter === "active" ? buttonTextColor : "inherit",
        }}
      >
        Active
      </Button>
    </div>
  );
}
