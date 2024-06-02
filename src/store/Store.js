import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./cryptoSlice";
import newsSlice from "./newsSlice";
const store=configureStore({
    reducer:{
      Data:mainSlice,
      News:newsSlice
    }
})

export default store;