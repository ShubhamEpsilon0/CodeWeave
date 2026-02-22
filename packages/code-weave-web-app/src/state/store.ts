import { configureStore } from "@reduxjs/toolkit";

import CellsReducer from "./slices/CellsSlice";
import BundleReducer from "./slices/BundleSlice";

import { postCellMiddleware } from "./middlewares/postCellMiddleware";

export const store = configureStore({
  reducer: {
    cells: CellsReducer,
    bundle: BundleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([postCellMiddleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
