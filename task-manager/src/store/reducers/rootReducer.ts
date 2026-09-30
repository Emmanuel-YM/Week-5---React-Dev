import { combineReducers } from "redux";
import taskReducer from "./taskReducer";

// Combine all reducers here (currently just one)
const rootReducer = combineReducers({
  taskState: taskReducer,
  
});

export default rootReducer;

// Define root state type for TypeScript
export type RootState = ReturnType<typeof rootReducer>;
