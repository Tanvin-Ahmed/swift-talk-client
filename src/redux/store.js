import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { useDispatch, useSelector } from "react-redux";
import { rootPersistConfig, rootReducers } from "./rootReducer";

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

const { dispatch } = store;

export { store, persistor, dispatch, useDispatch, useSelector };
