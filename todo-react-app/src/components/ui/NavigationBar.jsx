import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../../context/ThemeContext";

export default function NavigationBar({ signout }) {
  const { darkMode } = useTheme();

  return (
    <AppBar
      position="static"
      style={
        darkMode
          ? { backgroundColor: "var(--dark-color)" }
          : { backgroundColor: "var(--primary-color)" }
      }
    >
      <Toolbar>
        <Grid justify="space-between" alignItems="center" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <ThemeToggle />
            <Button color="inherit" onClick={signout}>
              logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
