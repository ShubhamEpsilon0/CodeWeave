import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  BundleCompleteActionPayload,
  BundleStartActionPayload,
  BundleState,
} from "../types";

const initialState: BundleState = {};

const bundleSlice = createSlice({
  name: "bundle",
  initialState,
  reducers: {
    bundleStart: (
      draftState,
      action: PayloadAction<BundleStartActionPayload>
    ) => {
      const { cellId } = action.payload;
      draftState[cellId] = {
        loading: true,
        code: "",
        error: null,
      };
    },
    bundleComplete: (
      draftState,
      action: PayloadAction<BundleCompleteActionPayload>
    ) => {
      const { cellId, bundle } = action.payload;
      draftState[cellId] = {
        loading: false,
        code: bundle.code,
        error: bundle.error,
      };
    },
  },
});

export const { bundleStart, bundleComplete } = bundleSlice.actions;

export default bundleSlice.reducer;
