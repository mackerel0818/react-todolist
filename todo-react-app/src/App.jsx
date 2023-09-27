import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "react-query";
import { Paper, List, Container } from "@material-ui/core";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import { call, signout } from "./service/ApiService";
import Loading from "./components/ui/Loading";
import FilterButtons from "./components/FilterButtons";
import NavigationBar from "./components/NavigationBar";
const queryClient = new QueryClient();

function App() {
  const [filter, setFilter] = useState("all");
  const {
    isLoading,
    error,
    data: items,
  } = useQuery("/todo", async () => {
    const response = await call("/todo", "GET", null);
    return response.data;
  });

  const mutation = useMutation((newItem) => call("/todo", "POST", newItem), {
    onSuccess: () => {
      queryClient.invalidateQueries("/todo");
    },
  });

  const handleAdd = (newItem) => {
    newItem.done = false;
    mutation.mutate(newItem);
  };

  const updateMutation = useMutation(
    (updatedItem) => call("/todo", "PUT", updatedItem),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("/todo");
      },
    }
  );

  const handleUpdate = (updatedItem) => {
    updateMutation.mutate(updatedItem);
  };

  const deleteMutation = useMutation(
    (deletedItem) => call("/todo", "DELETE", deletedItem),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("/todo");
      },
    }
  );

  const handleDelete = (deletedItem) => {
    deleteMutation.mutate(deletedItem);
  };

  let filteredItems = items;
  if (filter === "complete") {
    filteredItems = items.filter((item) => item.done);
  } else if (filter === "active") {
    filteredItems = items.filter((item) => !item.done);
  }

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  const todoItems = filteredItems && (
    <Paper style={{ margin: 16 }}>
      <List>
        {filteredItems.map((item) => (
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

  const todoListPage = (
    <div>
      <NavigationBar signout={signout} />
      <Container maxWidth="md">
        <AddTodo add={handleAdd} />
        <div className="TodoList">{todoItems}</div>
        <FilterButtons filter={filter} handleFilter={handleFilter} />
      </Container>
    </div>
  );

  const loadingPage = <Loading />;
  let content = loadingPage;

  if (!isLoading) {
    content = todoListPage;
  }

  return (
    <div className="App">
      {error && <p>{error}</p>}
      {content}
    </div>
  );
}

export default function WrappedApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
