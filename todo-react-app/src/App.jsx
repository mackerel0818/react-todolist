import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "react-query";
import { Paper, List } from "@material-ui/core";
import Todo from "./components/Todo";
import { call, signout } from "./service/ApiService";
import Loading from "./components/ui/Loading";
import TodoListPage from "./pages/TodoListPage";
import { ThemeProvider } from "./context/ThemeContext";
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

  const handleBatchDelete = async () => {
    const doneItems = items.filter((item) => item.done);

    const deletePromises = doneItems.map((item) => {
      return deleteMutation.mutateAsync(item);
    });

    await Promise.all(deletePromises);
    queryClient.invalidateQueries("/todo");
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

  return (
    <div className="App">
      {error && <p>{error}</p>}
      {isLoading ? (
        <Loading />
      ) : (
        <TodoListPage
          signout={signout}
          handleAdd={handleAdd}
          todoItems={todoItems}
          filter={filter}
          handleFilter={handleFilter}
          handleBatchDelete={handleBatchDelete}
        />
      )}
    </div>
  );
}

export default function WrappedApp() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
