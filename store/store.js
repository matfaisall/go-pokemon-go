import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "@/store/slice/pokemonSlice";
// tambahkan reducer lain disini nantinya.

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    // tambahkan reducer lain disini nantinya
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
