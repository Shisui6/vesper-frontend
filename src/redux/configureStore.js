import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user';
import carsReducer from './cars/cars';

const store = configureStore({
  reducer: {
    user: userReducer,
    cars: carsReducer,
  },
});

export default store;
