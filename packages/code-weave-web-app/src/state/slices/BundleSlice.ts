import { createSlice } from "@reduxjs/toolkit";

import type { BundleState } from "../types";
import { createBundleThunk } from "../thunks/createBundleThunk";

const initialState: BundleState = {};

const bundleSlice = createSlice({
  name: "bundle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBundleThunk.pending, (draftState, action) => {
      const { cellId } = action.meta.arg;
      draftState[cellId] = {
        loading: true,
        code: "",
        error: null,
      };
    });
    builder.addCase(createBundleThunk.fulfilled, (draftState, action) => {
      const { cellId, bundle } = action.payload;
      draftState[cellId] = {
        loading: false,
        code: bundle.code,
        error: bundle.error,
      };
    });
  },
});

export default bundleSlice.reducer;
