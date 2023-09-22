import React from "react";
import Todo from "./components/Todo";

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

  return (
    <div className="App">
      <Todo items={items} />
    </div>
  );
}
