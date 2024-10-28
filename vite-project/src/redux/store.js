import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./slices/role"; // Adjust path as necessary

const store = configureStore({
  reducer: {
    role: roleReducer, // Make sure this is correctly set
  },
});

export default store;
