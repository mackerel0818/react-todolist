import React from "react";
import Todo from "./components/Todo";
import { Paper, List } from "@material-ui/core";

export default function App() {
  // const [items, setItems] = useState([]);

  const items = [
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
  ];

  const todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo item={item} key={item.id} />
        ))}{" "}
      </List>
    </Paper>
  );

  return <div className="App">{todoItems}</div>;
}
