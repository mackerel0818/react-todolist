import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "react-query";
import { Paper, List, Container } from "@material-ui/core";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import { call } from "./service/ApiService";
import Loading from "./components/ui/Loading";

const queryClient = new QueryClient();

function App() {
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

  const todoItems = items && (
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
        <AddTodo add={handleAdd} items={items || []} />
        {isLoading && <Loading />}
        {error && <p>{error}</p>}
        <div className="TodoList">{todoItems}</div>
      </Container>
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
