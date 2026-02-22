import { createSlice } from "@reduxjs/toolkit";

import type { BundlerState } from "../types";
import { createBundleThunk } from "../thunks/createBundleThunk";
import { initializeBundlerThunk } from "../thunks/initializeBundlerThunk";

const initialState: BundlerState = {
  initialized: false,
  error: null,
  bundles: {},
};

const bundleSlice = createSlice({
  name: "bundle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBundleThunk.pending, (draftState, action) => {
      const { cellId } = action.meta.arg;
      draftState.bundles[cellId] = {
        loading: true,
        code: "",
        error: null,
      };
    });
    builder.addCase(createBundleThunk.fulfilled, (draftState, action) => {
      const { cellId, bundle } = action.payload;
      draftState.bundles[cellId] = {
        loading: false,
        code: bundle.code,
        error: bundle.error,
      };
    });
    builder.addCase(initializeBundlerThunk.pending, (draftState) => {
      draftState.initialized = false;
      draftState.error = null;
    });
    builder.addCase(initializeBundlerThunk.fulfilled, (draftState) => {
      draftState.initialized = true;
    });
    builder.addCase(initializeBundlerThunk.rejected, (draftState, action) => {
      draftState.initialized = false;
      draftState.error = action.error.message || "Failed to initialize bundler";
    });
  },
});

export default bundleSlice.reducer;
