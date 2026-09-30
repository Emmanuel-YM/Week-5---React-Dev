# Redux Task Manager

A task manager built with React 19, Redux and Material UI. It adds async logic (thunks), a loading and error state, and typed actions on top of basic Redux, and connects components to the store with `connect()`.

Built with React 19, Redux 5, React Redux 9, redux-thunk, redux-logger, Material UI 7 and Vite.

## Features

- Add, complete (toggle) and delete tasks
- Async `loadTasks` thunk that simulates fetching tasks from a backend, with a loading spinner and an error message
- Actions typed as a discriminated union for type-safe reducers
- Components connected with `connect()`, using `mapStateToProps` and both forms of `mapDispatchToProps` (object and function)
- Every action logged to the browser console by `redux-logger`
- Material UI layout and components

## Getting started

```bash
cd task-manager
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173) and the browser console to see the logged actions.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

> **Heads-up: the simulated error is on by default.** `loadTasks` in [`taskActions.ts`](src/store/actions/taskActions.ts) waits 2.5 seconds and then throws `"Simulated backend error"` on purpose, so on start-up you'll see a spinner followed by the error. While the error is set, the list shows only the error message, so tasks you add won't appear. To load the two mock tasks and use the app normally, delete this line:
>
> ```ts
> throw new Error("Simulated backend error"); // Simulate an error for testing
> ```

## State shape

The root reducer stores everything under `taskState`:

```ts
{
  taskState: {
    loading: boolean;          // true while loadTasks is running
    tasks: { id: number; text: string; completed: boolean }[];
    error: string | null;      // set when loadTasks fails
  }
}
```

## Actions

Defined in [`store/constants/taskConstants.ts`](src/store/constants/taskConstants.ts) and created in [`store/actions/taskActions.ts`](src/store/actions/taskActions.ts).

| Action | Payload | Effect on state |
| --- | --- | --- |
| `ADD_TASK` | `{ id, text, completed: false }` (`id` is `Date.now()`) | Appends the task |
| `TOGGLE_TASK` | task `id` | Flips `completed` on the matching task |
| `DELETE_TASK` | task `id` | Removes the matching task |
| `LOAD_TASKS_REQUEST` | none | `loading: true` |
| `LOAD_TASKS_SUCCESS` | array of tasks | `loading: false`, replaces `tasks` |
| `LOAD_TASKS_FAIL` | error message | `loading: false`, sets `error` |

### The `loadTasks` thunk

`loadTasks()` returns a function instead of a plain object. `redux-thunk` runs it with `dispatch`, so it can dispatch several actions over time:

1. Dispatch `LOAD_TASKS_REQUEST`
2. Wait 2.5 seconds to simulate a network request
3. Dispatch `LOAD_TASKS_SUCCESS` with mock tasks, or `LOAD_TASKS_FAIL` with the error message if something throws

### Typed actions

[`store/types/taskTypes.ts`](src/store/types/taskTypes.ts) defines one interface per action and combines them into a `TaskActionTypes` union. Inside each `case` of the reducer's `switch`, TypeScript narrows `action.payload` to the right type.

## Store

[`store/store.ts`](src/store/store.ts) creates the store with two middlewares:

```ts
createStore(rootReducer, applyMiddleware(thunk, logger));
```

- **redux-thunk** lets action creators return functions for async work
- **redux-logger** logs each action with the state before and after it

## Components

All in [`src/components`](src/components):

| Component | Role | Redux wiring |
| --- | --- | --- |
| `TaskManager` | Centered card layout with the title, input and list | None |
| `TaskInput` | Text field and **Add** button; ignores empty input | `connect(null, { addTask })`: object form of `mapDispatchToProps` |
| `TaskList` | Calls `loadTasks` on mount, then shows a spinner, the error, "No tasks found." or the list | `mapStateToProps` for `loading`/`tasks`/`error`, and a function form of `mapDispatchToProps` |
| `TaskItem` | Checkbox to toggle, strike-through when done, delete button | `connect(null, { toggleTask, deleteTask })` |

## Project structure

```
src/
├── components/
│   ├── TaskManager.tsx          # Layout
│   ├── TaskInput.tsx            # Add a task
│   ├── TaskList.tsx             # Load and render tasks
│   └── TaskItem.tsx             # Toggle / delete a task
├── store/
│   ├── actions/
│   │   └── taskActions.ts       # Action creators + loadTasks thunk
│   ├── constants/
│   │   └── taskConstants.ts     # Action type strings
│   ├── reducers/
│   │   ├── taskReducer.ts       # Task state reducer
│   │   └── rootReducer.ts       # combineReducers + RootState type
│   ├── types/
│   │   └── taskTypes.ts         # TaskActionTypes union
│   └── store.ts                 # createStore + thunk + logger
├── App.tsx                      # MUI Container wrapper
└── main.tsx                     # Entry point, wraps App in <Provider>
```

## Notes

- Tasks live only in memory, so they are lost on page refresh.
- This project uses the classic `createStore` and `connect()` APIs to show how Redux works under the hood. New projects should use [Redux Toolkit](https://redux-toolkit.js.org/) (`configureStore`, `createSlice`, `createAsyncThunk`) and the `useSelector`/`useDispatch` hooks. `@reduxjs/toolkit` is already installed.
