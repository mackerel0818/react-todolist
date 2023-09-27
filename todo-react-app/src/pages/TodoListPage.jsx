import React from "react";
import NavigationBar from "../components/NavigationBar";
import { Container } from "@material-ui/core";
import AddTodo from "../components/AddTodo";
import FilterButtons from "../components/FilterButtons";

export default function TodoListPage({
  signout,
  handleAdd,
  todoItems,
  filter,
  handleFilter,
}) {
  return (
    <div>
      <NavigationBar signout={signout} />
      <Container maxWidth="md">
        <AddTodo add={handleAdd} />
        <div className="TodoList">{todoItems}</div>
        <FilterButtons filter={filter} handleFilter={handleFilter} />
      </Container>
    </div>
  );
}
