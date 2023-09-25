import React from "react";
import { ListItem, ListItemText, InputBase, Checkbox } from "@material-ui/core";

export default function Todo({ item }) {
  const handleClick = () => {
    item.done = "";
  };

  return (
    <div>
      <ListItem>
        <Checkbox onClick={handleClick} checked={item.done} />
        <ListItemText>
          <InputBase
            inputProps={{ "aria-label": "naked" }}
            type="text"
            id={item.id}
            name={item.id}
            value={item.title}
            multiline={true}
            fullWidth={true}
          />
        </ListItemText>
      </ListItem>
    </div>
  );
}
