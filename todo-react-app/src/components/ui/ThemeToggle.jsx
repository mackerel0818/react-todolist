import React from "react";
import { IconButton } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  const handleToggle = () => {
    toggleDarkMode();
  };

  return (
    <IconButton onClick={handleToggle}>
      {darkMode ? (
        <Brightness7Icon style={{ color: "white" }} />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
}

export default ThemeToggle;
