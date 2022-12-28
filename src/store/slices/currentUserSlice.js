import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    isLoggedIn: true,
    id: 1,
    name: "Max",
  },
  reducers: {
    logOut(state, action) {
      state.isLoggedIn = false;
      state.id = -1;
      state.name = "";
    },
    logIn(state, action) {
      state.isLoggedIn = true;
      state.id = 1;
    },
    changeUser(state, action) {
      state.name = action.payload;
    },
  },
});

export const { logOut, logIn, changeUser } = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;
