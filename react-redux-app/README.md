# React Redux Counter

A minimal counter app that shows the core Redux data flow in a React + TypeScript project: **action → reducer → store → UI**.

Built with React 18, Redux 5, React Redux 9, redux-logger and Vite.

## Features

- Increment, decrement and reset a counter held in a global Redux store
- State read with the `useSelector` hook and updated with `useDispatch`
- Every dispatched action and the resulting state logged to the browser console by `redux-logger`
- Component styles scoped with CSS Modules

## Getting started

```bash
cd react-redux-app
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173), then open the browser console to watch actions being logged as you click the buttons.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## How it works

### 1. Action types — [`store/constants/index.ts`](src/store/constants/index.ts)

String constants for each action, so a typo is caught instead of silently doing nothing:

```ts
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";
```

### 2. Action creators — [`store/actions/counterActions.ts`](src/store/actions/counterActions.ts)

Functions that return plain action objects:

```ts
export const increment = () => ({ type: INCREMENT });
```

### 3. Reducer — [`store/reducers/counterReducer.ts`](src/store/reducers/counterReducer.ts)

A pure function that takes the current state and an action and returns the new state. The initial state is `{ value: 0 }`.

| Action | New state |
| --- | --- |
| `INCREMENT` | `value + 1` |
| `DECREMENT` | `value - 1` |
| `RESET` | `0` |

The reducer is registered under the `counter` key with `combineReducers` in [`store/reducers/index.ts`](src/store/reducers/index.ts), so the count lives at `state.counter.value`.

### 4. Store — [`store/store.ts`](src/store/store.ts)

The store is created with `createStore(rootReducer, applyMiddleware(logger))`. The file also exports `RootState` and `AppDispatch` types for use in components.

### 5. Providing the store — [`main.tsx`](src/main.tsx)

`<Provider store={store}>` wraps `<App />` so any component can reach the store.

### 6. Using the store — [`components/Counter.tsx`](src/components/Counter.tsx)

```tsx
const count = useSelector((state: RootState) => state.counter.value);
const dispatch = useDispatch();

<button onClick={() => dispatch(increment())}>+</button>
```

## Project structure

```
src/
├── components/
│   ├── Counter.tsx            # Counter UI (useSelector / useDispatch)
│   └── Counter.module.css     # Scoped styles
├── store/
│   ├── actions/
│   │   └── counterActions.ts  # increment, decrement, reset
│   ├── constants/
│   │   └── index.ts           # Action type strings
│   ├── reducers/
│   │   ├── counterReducer.ts  # Counter reducer
│   │   └── index.ts           # combineReducers → rootReducer
│   └── store.ts               # createStore + redux-logger
├── App.tsx                    # Page layout
└── main.tsx                   # Entry point, wraps App in <Provider>
```

## Notes

- This project uses the classic `createStore` API on purpose, to show how Redux works under the hood. New projects should use [Redux Toolkit](https://redux-toolkit.js.org/)'s `configureStore` and `createSlice`.
- The reducer's `action` parameter is typed as `any`. A typed action union, like the one in [`task-manager`](../task-manager), would make it type-safe.
