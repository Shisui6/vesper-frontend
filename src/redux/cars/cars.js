/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cars: [],
  isLoading: false,
  notice: '',
};

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (data) => {
    const response = await fetch('http://localhost:3000/api/v1/cars', {
      headers: {
        Authorization: data,
      },
    });
    const json = await response.json();
    return json;
  },
);

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setNotice(state, action) {
      state.notice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = action.payload;
      });
  },
});

export const { setNotice } = carsSlice.actions;

export const selectCars = (state) => state.cars.cars;
export const selectIsLoading = (state) => state.countries.isLoading;
export const selectNotice = (state) => state.user.notice;

export default carsSlice.reducer;
