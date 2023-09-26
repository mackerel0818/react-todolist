import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

export default function Todo({ item, remove, update }) {
  const [title, setTitle] = useState(item.title);
  const [ischecked, setIsChecked] = useState(item.done);
  const [readOnlyMode, setReadOnlyMode] = useState(true);

  const handleChange = () => {
    setIsChecked(!ischecked);
    item.done = !item.done;
    update(item);
  };

  const offReadOnlyMode = () => {
    setReadOnlyMode(!readOnlyMode);
  };

  const handleEdit = (e) => {
    setTitle(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setReadOnlyMode(!readOnlyMode);
      item.title = title;
      console.log(item);
      update(item);
    }
  };

  const handleDelete = () => {
    const deletedItem = {
      id: item.id,
    };
    remove(deletedItem);
  };

  return (
    <div>
      <ListItem>
        <Checkbox onChange={handleChange} checked={item.done} />
        <ListItemText>
          <InputBase
            inputProps={{ "aria-label": "naked", readOnly: readOnlyMode }}
            type="text"
            id={item.id}
            name={item.id}
            value={readOnlyMode ? item.title : title}
            multiline={true}
            fullWidth={true}
            onClick={offReadOnlyMode}
            onChange={handleEdit}
            onKeyPress={handleEnter}
          />
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={handleDelete}>
            <DeleteOutlined />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}
