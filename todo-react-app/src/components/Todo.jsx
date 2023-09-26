import React, { useState } from "react";
import { ListItem, ListItemText, InputBase, Checkbox } from "@material-ui/core";

export default function Todo({ item }) {
  const [ischecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!ischecked);
    item.done = !item.done;
    console.log(item);
  };

  return (
    <div>
      <ListItem>
        <Checkbox onChange={handleChange} checked={item.done} />
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
