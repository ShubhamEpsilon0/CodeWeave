import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import type { Cell } from "@/constants/types";

export const fetchCellsThunk = createAsyncThunk<
  Cell[], // Return type
  void, // Argument type
  { rejectValue: string }
>("cells/fetchCells", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<{ cells: string }>("/api/cells");

    return JSON.parse(data.cells) as Cell[];
  } catch {
    return rejectWithValue("Failed to fetch cells");
  }
});
