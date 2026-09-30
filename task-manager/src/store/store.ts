import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger"; // Middleware to log actions
import rootReducer from "./reducers/rootReducer";

// Create logger middleware instance
const logger = createLogger({
  collapsed: false,
});

// Create Redux store with rootReducer and middleware thunk and logger
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
export type AppDispatch = typeof store.dispatch;