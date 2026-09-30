import React, { useState } from "react";
import { connect } from "react-redux";
import { addTask } from "../store/actions/taskActions";
import { TextField, Button, Box } from "@mui/material";

interface TaskInputProps {
  addTask: (text: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ addTask }) => {
  const [taskText, setTaskText] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText.trim());
      setTaskText("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2} // spacing between elements
        flexWrap="wrap" // make it wrap nicely on small screens
      >
        <Box flexGrow={1} minWidth={200}>
          <TextField
            label="New Task"
            variant="outlined"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            fullWidth
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ minWidth: 100 }}
        >
          Add
        </Button>
      </Box>
    </form>
  );
};

const mapDispatchToProps = {
  addTask,
};
export default connect(null, mapDispatchToProps)(TaskInput);
