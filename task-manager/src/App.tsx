import React from "react";
import { Container } from "@mui/material";
import TaskManager from "./components/TaskManager";

const App: React.FC = () => {
  return (
    <Container>
      <TaskManager />
    </Container>
  );
};

export default App;
