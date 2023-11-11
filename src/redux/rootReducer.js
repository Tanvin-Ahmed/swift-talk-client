import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";
import authReducer from "./slices/auth";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  //   whitelist: [],
  // blacklist: [],
};

const rootReducers = combineReducers({
  app: appReducer,
  auth: authReducer,
});

export { rootReducers, rootPersistConfig };
