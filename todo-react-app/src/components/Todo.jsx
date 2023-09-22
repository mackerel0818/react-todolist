import React from "react";

export default function Todo({ items }) {
  return (
    <div>
      {items.map((item) => (
        <div>
          <input
            type="checkbox"
            id={item.id}
            name={item.id}
            checked={item.done}
          />
          <label for={item.id}>{item.title}</label>
        </div>
      ))}
    </div>
  );
}
