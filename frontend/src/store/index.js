import { configureStore } from "@reduxjs/toolkit";
import userSliceRudecer from "./slices/userSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    user: userSliceRudecer,
    // auth: authSlice,
  },
  devTools: true,
});
