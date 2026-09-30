import React, { useEffect } from "react";
import { connect } from "react-redux";
import type { RootState } from "../store/reducers/rootReducer";
import { loadTasks } from "../store/actions/taskActions";
import { List, Typography, CircularProgress } from "@mui/material";
import TaskItem from "./TaskItem";
import type { AppDispatch } from "../store/store";

interface TaskListProps {
  loading: boolean;
  tasks: { id: number; text: string; completed: boolean }[];
  error: string | null;
  loadTasks: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  loading,
  tasks,
  error,
  loadTasks,
}) => {
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!tasks.length) return <Typography>No tasks found.</Typography>;

  return (
    <List>
      {tasks.map((task) => (
        <TaskItem key={task.id} {...task} />
      ))}
    </List>
  );
};

const mapStateToProps = (state: RootState) => ({
  loading: state.taskState.loading,
  tasks: state.taskState.tasks,
  error: state.taskState.error,
});

// Explicit mapDispatchToProps function, manually wraps action creators with dispatch
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  loadTasks: () => dispatch(loadTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);




// export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
