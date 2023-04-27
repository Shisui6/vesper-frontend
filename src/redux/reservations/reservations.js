/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reservations: [],
  isLoading: false,
};

export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (data) => {
    const response = await axios.get('https://vesper-backend.onrender.com/api/v1/reservations', data);
    return response.data.reservations;
  },
);

export const deleteReservation = createAsyncThunk(
  'reservations/deleteReservation',
  async (data) => {
    await axios.delete(`https://vesper-backend.onrender.com/api/v1/reservations/${data.id}`, {
      headers: {
        Authorization: data.auth,
      },
    });
  },
);

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    removeReservation(state, action) {
      state.reservations = state.reservations.filter((r) => r.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reservations = action.payload;
      });
  },
});

export const { removeReservation } = reservationsSlice.actions;

export const selectReservations = (state) => state.reservations.reservations;
export const selectIsLoading = (state) => state.reservations.isLoading;

export default reservationsSlice.reducer;
