import { createSlice } from "@reduxjs/toolkit";

import type { AppState } from "../types";

import { initializeAppThunk } from "../thunks/initializeAppThunk";

const initialState: AppState = {
  initialized: false,
  error: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initializeAppThunk.pending, (draftState) => {
      draftState.initialized = false;
    });
    builder.addCase(initializeAppThunk.fulfilled, (draftState) => {
      draftState.initialized = true;
    });
    builder.addCase(initializeAppThunk.rejected, (draftState, action) => {
      draftState.initialized = false;
      draftState.error =
        action.payload || action.error.message || "Failed to initialize app";
    });
  },
});

export default appSlice.reducer;
