import type { AppDispatch } from "../store";
import {
  ADD_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  LOAD_TASKS_REQUEST,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAIL,
} from "../constants/taskConstants";

// Action creator to add a new task
export const addTask = (taskText: string) => {
  return {
    type: ADD_TASK,
    payload: { text: taskText, completed: false, id: Date.now() },
  };
};

// Action creator to toggle the completion status of a task by id
export const toggleTask = (taskId: number) => {
  return {
    type: TOGGLE_TASK,
    payload: taskId,
  };
};

// Action creator to delete a task by id
export const deleteTask = (taskId: number) => {
  return {
    type: DELETE_TASK,
    payload: taskId,
  };
};

// Async thunk action to simulate fetching tasks from backend
export const loadTasks = () => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: LOAD_TASKS_REQUEST });
    try {
      // Simulate backend delay with timeout
      await new Promise((res) => setTimeout(res, 2500));

      throw new Error("Simulated backend error"); // Simulate an error for testing

      // Mock tasks fetched from "backend"
      const tasks = [
        { id: 1, text: "Learn Node", completed: false },
        { id: 2, text: "Build Task Manager", completed: false },
      ];

      dispatch({ type: LOAD_TASKS_SUCCESS, payload: tasks });
    } catch (error) {
      // Type guard: ensure error is an Error instance before accessing .message
      // Fallback handles cases where non-Error values are thrown
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      // Dispatch failure action with error message for UI feedback
      dispatch({ type: LOAD_TASKS_FAIL, payload: errorMessage });
    }
  };
};
