import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "models/authentication";
import { RootState } from "redux/store";

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setPreference: (state, action: PayloadAction<string[]>) => {
      state.user!.userPreference = action.payload;
    },
    logout: () => initialState,
    updateUserCredentials: (state, action: PayloadAction<{username: string}>) => {
      state.user!.username = action.payload.username;
    },
  },
});

export const userCredentials = (state: RootState) => state.user;

export const { setUser, logout, setPreference, updateUserCredentials } = userSlice.actions;

export default userSlice.reducer;
