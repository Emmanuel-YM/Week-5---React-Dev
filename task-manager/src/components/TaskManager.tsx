import React from "react";
import { Paper, Typography, Box, styled } from "@mui/material";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

// Styled container to center content vertically and horizontally
const Container = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.grey[100], // light gray background
  padding: theme.spacing(2),
}));

// Styled Paper with padding, max width, and rounded corners
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  width: "100%",
  borderRadius:
    typeof theme.shape.borderRadius === "number"
      ? theme.shape.borderRadius * 3
      : `calc(${theme.shape.borderRadius} * 3)`,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

// Styled Typography for the header
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  letterSpacing: 1,
  textTransform: "uppercase",
}));

const TaskManager: React.FC = () => {
  return (
    <Container>
      <StyledPaper elevation={6}>
        <Title variant="h4" align="center" gutterBottom>
          Redux Basic Task Manager
        </Title>

        {/* Input for adding tasks */}
        <TaskInput />

        {/* List of tasks */}
        <TaskList />
      </StyledPaper>
    </Container>
  );
};

export default TaskManager;
