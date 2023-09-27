import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "react-query";
import {
  Paper,
  List,
  Container,
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import { call, signout } from "./service/ApiService";
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

  const navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justify="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={signout}>
              logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  const todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo add={handleAdd} />
        <div className="TodoList">{todoItems}</div>
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
