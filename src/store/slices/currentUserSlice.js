import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    isLoggedIn: true,
    id: 100,
    name: "Guest",
    avatarColor: "#b83d1f",
  },
  reducers: {
    logOut(state, action) {
      state.isLoggedIn = false;
      state.id = -1;
      state.name = "";
      state.avatarColor = "";
    },
    logIn(state, action) {
      state.isLoggedIn = true;
      state.id = action.payload.id;
      state.name = action.payload.username;
      state.avatarColor = action.payload.avatarColor;
    },
  },
});

export const { logOut, logIn } = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;
