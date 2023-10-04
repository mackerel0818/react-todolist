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
import { useTheme } from "../context/ThemeContext";

export default function Todo({ item, remove, update }) {
  const [title, setTitle] = useState(item.title);
  const [ischecked, setIsChecked] = useState(item.done);
  const [readOnlyMode, setReadOnlyMode] = useState(true);
  const { darkMode } = useTheme();
  const itemStyle = {
    textDecoration: item.done ? "line-through" : "none",
    color: item.done ? "#8d8d8d" : "inherit",
  };

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
      item.title = title;
      update(item);
      setReadOnlyMode(!readOnlyMode);
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
        <Checkbox
          color={darkMode ? "var(--dark-color)" : "secondary"}
          onChange={handleChange}
          checked={ischecked}
        />
        <ListItemText>
          <InputBase
            style={itemStyle}
            inputProps={{ "aria-label": "naked", readOnly: readOnlyMode }}
            type="text"
            id={item.id}
            name={item.id}
            value={title}
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
