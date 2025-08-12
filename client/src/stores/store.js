import { configureStore } from "@reduxjs/toolkit";
import State from "./state";
const Store = configureStore({
  reducer: {
    Card: State,
  },
});
export default Store;
