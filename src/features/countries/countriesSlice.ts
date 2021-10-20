import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { error } from "console";
import { RootState, AppThunk } from "../../app/store";
import countriesService from "../../service/countriesService";
import { CountryDto } from "../../service/dto/countryDto";

export interface IProps {
  list: CountryDto[];
  loading: boolean;
  error: string;
}

const initialState: IProps = {
  list: [],
  loading: false,
  error: "",
};

export const getAllCountriesAsync = createAsyncThunk(
  "api/countries",
  async () => {
    const response = await countriesService.GetAll();
    return response;
  }
);

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountriesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCountriesAsync.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      })
      .addCase(getAllCountriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  },
});
export const countriesList = (state: RootState) => state.country.list;
export const countriesLoading = (state: RootState) => state.country.loading;
export default countriesSlice.reducer;
