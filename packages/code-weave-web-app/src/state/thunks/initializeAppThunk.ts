import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchCellsThunk } from "./fetchCellsThunk";
import { initializeBundlerThunk } from "./initializeBundlerThunk";

export const initializeAppThunk = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string }
>("app/initializeApp", async (_, { dispatch, rejectWithValue }) => {
  try {
    await dispatch(initializeBundlerThunk()).unwrap();
    await dispatch(fetchCellsThunk()).unwrap();
    return true;
  } catch (err) {
    return rejectWithValue(
      `Failed to initialize app: ${err instanceof Error ? err.message : String(err)}`
    );
  }
});
