import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";
import authService from "./services/authServices";
import categoryService from "./services/categoryServices";

const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
  },
});

export default Store;
