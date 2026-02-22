import { createAsyncThunk } from "@reduxjs/toolkit";

import type { Cell } from "@/constants/types";

import { fetchCells } from "@/remote/APIs";

export const fetchCellsThunk = createAsyncThunk<
  Cell[], // Return type
  void, // Argument type
  { rejectValue: string }
>("cells/fetchCells", async (_, { rejectWithValue }) => {
  try {
    return await fetchCells();
  } catch (err) {
    return rejectWithValue("Failed to fetch cells");
  }
});
