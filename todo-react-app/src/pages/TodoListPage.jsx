import React from "react";
import NavigationBar from "../components/ui/NavigationBar";
import { Button, Container } from "@material-ui/core";
import AddTodo from "../components/AddTodo";
import FilterButtons from "../components/ui/FilterButtons";
import { useTheme } from "../context/ThemeContext";

export default function TodoListPage({
  signout,
  handleAdd,
  todoItems,
  filter,
  handleFilter,
  handleBatchDelete,
}) {
  const { darkMode } = useTheme();

  return (
    <div>
      <NavigationBar signout={signout} />
      <Container maxWidth="md">
        <AddTodo add={handleAdd} />
        <div className="TodoList">{todoItems}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 15px",
          }}
        >
          <FilterButtons filter={filter} handleFilter={handleFilter} />
          <Button
            variant="contained"
            color={darkMode ? "var(--dark-color)" : "secondary"}
            onClick={handleBatchDelete}
          >
            Clear
          </Button>
        </div>
      </Container>
    </div>
  );
}
