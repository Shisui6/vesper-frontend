/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  username: '',
  notice: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setNotice(state, action) {
      state.notice = action.payload;
    },
  },
});

export const { setUsername, setId, setNotice } = userSlice.actions;

export const selectUsername = (state) => state.user.username;
export const selectId = (state) => state.user.id;
export const selectNotice = (state) => state.user.notice;

export default userSlice.reducer;
