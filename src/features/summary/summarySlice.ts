import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { error } from "console";
import { RootState, AppThunk } from "../../app/store";
import { DayoneDto } from "../../service/dto/dayoneDto";
import summaryService from "../../service/summaryService";
export interface IProps {
  list: DayoneDto[];
  loading: boolean;
  error: string;
}

const initialState: IProps = {
  list:[],
  loading: false,
  error: "",
};

export const getDayOneAsync = createAsyncThunk("api/summary", async (country: string) => {
  const response = await summaryService.DayOneGetCountry(country);
  return response;
});

export const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDayOneAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDayOneAsync.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      })
      .addCase(getDayOneAsync.fulfilled, (state, action) => {
        state.loading = true;
        state.list = action.payload;
      });
  },
});
export const summaryList = (state: RootState) => state.summary.list;
export const summaryLoading = (state: RootState) => state.summary.loading;
export default summarySlice.reducer;
