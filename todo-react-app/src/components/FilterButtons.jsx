import React from "react";
import Button from "@material-ui/core/Button";

export default function FilterButtons({ filter, handleFilter }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant={filter === "all" ? "contained" : "outlined"}
        color="primary"
        onClick={() => handleFilter("all")}
        style={{
          backgroundColor: filter === "all" ? "#F50057" : "transparent",
          color: filter === "all" ? "white" : "inherit",
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
          backgroundColor: filter === "complete" ? "#F50057" : "transparent",
          color: filter === "complete" ? "white" : "inherit",
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
          backgroundColor: filter === "active" ? "#F50057" : "transparent",
          color: filter === "active" ? "white" : "inherit",
        }}
      >
        Active
      </Button>
    </div>
  );
}
