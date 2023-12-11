import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import userSliceRudecer from "./slices/userSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    user: userSliceRudecer,
    // auth: authSlice,
  },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore these action types
//         ignoredActions: ['user/addImage/fulfilled'],
//       },
//       serializableCheckIgnore: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     }),
  devTools: true,
});
