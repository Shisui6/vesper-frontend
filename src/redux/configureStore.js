import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './cars/cars';
import reservationsReducer from './reservations/reservations';

const store = configureStore({
  reducer: {
    cars: carsReducer,
    reservations: reservationsReducer,
  },
});

export default store;
