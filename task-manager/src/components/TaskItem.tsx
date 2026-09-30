import React from "react";
import { connect } from "react-redux";
import { toggleTask, deleteTask } from "../store/actions/taskActions";
import { ListItem, Checkbox, IconButton, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface TaskItemProps {
  id: number;
  text: string;
  completed: boolean;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  text,
  completed,
  toggleTask,
  deleteTask,
}) => {
  return (
    <ListItem
      divider
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(id)}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <Checkbox checked={completed} onChange={() => toggleTask(id)} />
      <ListItemText
        primary={text}
        style={{ textDecoration: completed ? "line-through" : "none" }}
      />
    </ListItem>
  );
};

export default connect(null, { toggleTask, deleteTask })(TaskItem);
