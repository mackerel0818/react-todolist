import { Button, Grid, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function AddTodo({ add }) {
  const [item, setItem] = useState({ title: "" });
  const { darkMode } = useTheme();

  const onButtonClick = () => {
    if (item.title.trim() !== "") {
      add(item);
      setItem({ title: "" });
    }
  };

  const onInputChange = (e) => setItem({ title: e.target.value });

  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") onButtonClick();
  };

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="Add Todo here"
            fullWidth
            onChange={onInputChange}
            value={item.title}
            onKeyPress={enterKeyEventHandler}
            color={darkMode ? "var(--dark-color)" : "secondary"}
          />
        </Grid>
        <Grid xs={1} md={1} item>
          <Button
            fullWidth
            color={darkMode ? "var(--dark-color)" : "secondary"}
            variant="outlined"
            onClick={onButtonClick}
          >
            +
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
