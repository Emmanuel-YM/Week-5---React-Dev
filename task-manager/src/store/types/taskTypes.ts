import {
  ADD_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  LOAD_TASKS_REQUEST,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAIL,
} from "../constants/taskConstants";

// Action type interfaces
interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: { text: string; completed: boolean; id: number };
}

interface ToggleTaskAction {
  type: typeof TOGGLE_TASK;
  payload: number;
}

interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: number;
}

interface LoadTasksRequestAction {
  type: typeof LOAD_TASKS_REQUEST;
}

interface LoadTasksSuccessAction {
  type: typeof LOAD_TASKS_SUCCESS;
  payload: { id: number; text: string; completed: boolean }[];
}

interface LoadTasksFailAction {
  type: typeof LOAD_TASKS_FAIL;
  payload: string;
}

// Union type of all task actions
export type TaskActionTypes =
  | AddTaskAction
  | ToggleTaskAction
  | DeleteTaskAction
  | LoadTasksRequestAction
  | LoadTasksSuccessAction
  | LoadTasksFailAction;

