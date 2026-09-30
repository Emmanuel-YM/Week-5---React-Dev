# Week 5 — React State Management with Redux

Two small React + TypeScript projects built with Vite, practising global state management using Redux.

| Project | What it shows | Stack |
| --- | --- | --- |
| [`react-redux-app`](./react-redux-app) | A counter wired to a Redux store with `useSelector` / `useDispatch` | React 18, Redux 5, React Redux 9, redux-logger, CSS Modules |
| [`task-manager`](./task-manager) | A task list with add / toggle / delete and an async "load tasks" thunk, wired with `connect()` | React 19, Redux 5, React Redux 9, redux-thunk, redux-logger, Material UI 7 |

## Projects

### react-redux-app — Counter

A minimal introduction to the Redux data flow: action → reducer → store → UI.

- **Actions:** `increment`, `decrement`, `reset` ([`counterActions.ts`](./react-redux-app/src/store/actions/counterActions.ts))
- **Reducer:** [`counterReducer.ts`](./react-redux-app/src/store/reducers/counterReducer.ts), combined in [`reducers/index.ts`](./react-redux-app/src/store/reducers/index.ts)
- **Store:** created with `createStore` and `redux-logger` middleware ([`store.ts`](./react-redux-app/src/store/store.ts))
- **UI:** [`Counter.tsx`](./react-redux-app/src/components/Counter.tsx) reads state with `useSelector` and dispatches with `useDispatch`

### task-manager — Redux Task Manager

A task manager that adds async logic and typed actions.

- **Actions:** `addTask`, `toggleTask`, `deleteTask`, and the async thunk `loadTasks` ([`taskActions.ts`](./task-manager/src/store/actions/taskActions.ts))
- **Typed actions:** a discriminated union in [`taskTypes.ts`](./task-manager/src/store/types/taskTypes.ts)
- **Reducer:** tracks `loading`, `tasks` and `error` ([`taskReducer.ts`](./task-manager/src/store/reducers/taskReducer.ts))
- **Store:** `redux-thunk` + `redux-logger` middleware ([`store.ts`](./task-manager/src/store/store.ts))
- **UI:** Material UI components connected with `connect()` — `mapStateToProps`, and `mapDispatchToProps` in both object and function form ([`components/`](./task-manager/src/components))

> **Note:** `loadTasks` waits 2.5 seconds and then throws a simulated backend error on purpose, so the app shows the loading spinner followed by the error state. Remove the `throw` line in `taskActions.ts` to load the mock tasks instead.

## Getting started

Requires [Node.js](https://nodejs.org/) 18+ and npm. Each project is independent, so install and run them separately:

```bash
git clone https://github.com/Emmanuel-YM/Week-5---React-Dev.git
cd Week-5---React-Dev

# Counter app
cd react-redux-app
npm install
npm run dev

# Task manager (in a new terminal, from the repo root)
cd task-manager
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173). Open the browser console to see every dispatched action logged by `redux-logger`.

### Available scripts

Run these inside either project folder:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Key Redux concepts covered

- **Store** — the single source of truth holding the app's state
- **Actions** — plain objects with a `type` (and optional `payload`) describing what happened
- **Reducers** — pure functions `(state, action) => newState`
- **Dispatch** — the only way to update state
- **Selectors** — functions that read specific values from the state
- **Middleware** — `redux-thunk` for async logic, `redux-logger` for debugging

## Project structure

```
.
├── react-redux-app/
│   └── src/
│       ├── components/        # Counter component + CSS module
│       └── store/
│           ├── actions/       # Action creators
│           ├── constants/     # Action type constants
│           ├── reducers/      # Counter reducer + root reducer
│           └── store.ts       # Store setup
└── task-manager/
    └── src/
        ├── components/        # TaskManager, TaskInput, TaskList, TaskItem
        └── store/
            ├── actions/       # Action creators + loadTasks thunk
            ├── constants/     # Action type constants
            ├── reducers/      # Task reducer + root reducer
            ├── types/         # Typed action union
            └── store.ts       # Store setup with middleware
```
