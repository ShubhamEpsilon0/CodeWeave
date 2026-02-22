import { initializeBundler } from "@/bundle/bundler";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const initializeBundlerThunk = createAsyncThunk<void, void>(
  "bundle/initializeBundler",
  async () => {
    await initializeBundler();
  }
);
