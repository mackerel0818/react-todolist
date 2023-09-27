import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";

export default function NavigationBar({ signout }) {
  return (
    <AppBar position="static" style={{ backgroundColor: "#F50057" }}>
      <Toolbar>
        <Grid justify="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={signout}>
              logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
