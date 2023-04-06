import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const URL = 'https://rental-rooms.onrender.com/api/v1';
export const FETCH_CARS = `${URL}/rooms`;

const CREATE_CARS_URL = 'https://rental-rooms.onrender.com/api/v1/rooms';

const initialState = {
  rooms: [],
  status: 'idle',
  error: null,
  isRoomCreated: false,
};

export const createCar = createAsyncThunk('create_car', async (carInfo) => {
  const res = fetch(CREATE_CARS_URL, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify(carInfo),
  });
  const data = (await res).json();
  return data;
});
