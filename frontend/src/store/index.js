import { configureStore } from "@reduxjs/toolkit";
import userSliceRudecer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSliceRudecer,
  },
  devTools: true,
});
