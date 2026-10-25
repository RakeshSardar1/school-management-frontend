import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import type { PersistConfig } from "redux-persist";

import rootReducer from "./redux/rootReducer";
import type { RootState as RootStateType } from "./redux/rootReducer";

// ✅ Use window.localStorage directly
const storage = {
  getItem: (key: string) => {
    const value = window.localStorage.getItem(key);
    return Promise.resolve(value);
  },
  setItem: (key: string, value: string) => {
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

// ✅ Properly typed persist config
const persistConfig: PersistConfig<RootStateType> = {
  key: "root",
  version: 1,
  storage, // ✅ Now using custom storage object
  stateReconciler: hardSet,
  whitelist: ["teachersData", "galleryData", "common"],
};

// ✅ Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/PURGE",
        ],
        ignoredPaths: ["persist", "galleryData", "teachersData"],
      },
    }),
});

// ✅ Create persistor
export const persistor = persistStore(store);

// ✅ Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
