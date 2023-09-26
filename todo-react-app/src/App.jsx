import React, { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { Paper, List, Container } from "@material-ui/core";
import AddTodo from "./components/AddTodo";
import { call } from "./service/ApiService";

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    call("/todo", "GET", null).then((response) => {
      setItems(response.data);
    });
  }, [items]);

  const handleAdd = (newItem) => {
    newItem.done = false;
    call("/todo", "POST", newItem).then((response) => {
      const item = response.data;
      setItems((prevItems) => [...prevItems, item]);
    });
  };

  const handleUpdate = (updatedItem) => {
    call("/todo", "PUT", updatedItem).then((response) => {
      setItems(response.data);
    });
  };

  const handleDelete = (deletedItem) => {
    call("/todo", "DELETE", deletedItem).then((response) => {
      setItems(response.data);
    });
  };

  const todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo
            item={item}
            key={item.id}
            remove={handleDelete}
            update={handleUpdate}
          />
        ))}
      </List>
    </Paper>
  );

  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo add={handleAdd} items={items} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );
}
