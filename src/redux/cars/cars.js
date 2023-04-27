/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cars: [],
  isLoading: false,
  notice: '',
  selectedCar: null,
};

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (data) => {
    const response = await axios.get('https://vesper-backend.onrender.com/api/v1/cars', {
      headers: {
        Authorization: data,
      },
    });
    return response.data;
  },
);

export const deleteCar = createAsyncThunk(
  'cars/deleteCar',
  async (data) => {
    await axios.delete(`https://vesper-backend.onrender.com/api/v1/cars/${data.id}`, {
      headers: {
        Authorization: data.auth,
      },
    });
  },
);

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setNotice(state, action) {
      state.notice = action.payload;
    },
    removeCar(state, action) {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
    },
    setSelectedCar(state, action) {
      state.selectedCar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = action.payload;
      });
  },
});

export const { setNotice, removeCar, setSelectedCar } = carsSlice.actions;

export const selectCars = (state) => state.cars.cars;
export const selectIsLoading = (state) => state.cars.isLoading;
export const selectNotice = (state) => state.cars.notice;
export const selectSelectedCar = (state) => state.cars.selectedCar;

export default carsSlice.reducer;
