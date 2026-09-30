import type { Reducer } from "redux";
import type { TaskActionTypes } from "../types/taskTypes";
import {
  ADD_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  LOAD_TASKS_REQUEST,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAIL,
} from "../constants/taskConstants";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  loading: boolean;
  tasks: Task[];
  error: string | null;
}

// Initial state for task reducer
const initialState: TaskState = {
  loading: false,
  tasks: [],
  error: null,
};

// Reducer function to handle task related actions
const taskReducer = (
  state: TaskState = initialState,
  action: TaskActionTypes,
): TaskState => {
  switch (action.type) {
    case LOAD_TASKS_REQUEST:
      return { ...state, loading: true };
    case LOAD_TASKS_SUCCESS:
      return { ...state, loading: false, tasks: action.payload};
    case LOAD_TASKS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };

    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task,
        ),
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    default:
      return state;
  }
};

// Redux 5 requires reducers to accept any action (e.g. @@INIT); cast so combineReducers infers state correctly
export default taskReducer as Reducer<TaskState>;
