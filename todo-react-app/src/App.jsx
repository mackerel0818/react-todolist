import React, { useState } from "react";
import Todo from "./components/Todo";
import { Paper, List, Container } from "@material-ui/core";
import { v4 as uuid } from "uuid";
import AddTodo from "./components/AddTodo";

export default function App() {
  const [items, setItems] = useState([
    {
      id: 0,
      title: "Todo1",
      done: false,
    },
    {
      id: 1,
      title: "Todo2",
      done: false,
    },
  ]);

  const todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo item={item} key={item.id} />
        ))}{" "}
      </List>
    </Paper>
  );

  const handleAdd = (item) => {
    item.id = uuid();
    item.done = false;
    const updatedItems = [...items, item];
    setItems(updatedItems);
    console.log("items:", updatedItems);
  };

  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo add={handleAdd} items={items} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );
}
