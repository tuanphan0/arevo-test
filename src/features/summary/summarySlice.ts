import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CaseRequest, CaseInfoDto } from "../../service/dto/dayoneDto";
import summaryService from "../../service/summaryService";
export interface IState {
  list: CaseInfoDto[];
  loading: boolean;
  error: string;
}

const initialState: IState = {
  list: [],
  loading: false,
  error: "",
};

export const getCasesForCountryByDateAsyncAsync = createAsyncThunk(
  "api/summary",
  async (request: CaseRequest) => {
    const response = await summaryService.getCasesForCountryByDate(request);
    return response;
  }
);

export const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCasesForCountryByDateAsyncAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCasesForCountryByDateAsyncAsync.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      })
      .addCase(
        getCasesForCountryByDateAsyncAsync.fulfilled,
        (state, action) => {
          state.list = action.payload;
          state.loading = false;
        }
      );
  },
});
export const summaryList = (state: RootState) => state.summary.list;
export const summaryLoading = (state: RootState) => state.summary.loading;
export default summarySlice.reducer;
