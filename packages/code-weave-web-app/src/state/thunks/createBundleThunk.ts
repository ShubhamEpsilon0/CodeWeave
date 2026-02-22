import { createAsyncThunk } from "@reduxjs/toolkit";

import { bundleCode } from "@/bundle/bundler";

import type { BundleCompleteActionPayload } from "../types";

export const createBundleThunk = createAsyncThunk<
  BundleCompleteActionPayload, // Return type
  { cellId: string; inputCode: string } // Argument type
>("bundle/createBundle", async ({ cellId, inputCode }) => {
  try {
    const bundleResult = await bundleCode(inputCode);
    return {
      cellId,
      bundle: {
        code: bundleResult.code,
        error: bundleResult.err,
      },
    };
  } catch (err) {
    return {
      cellId,
      bundle: {
        code: "",
        error: err instanceof Error ? err.message : "Unknown error",
      },
    };
  }
});
