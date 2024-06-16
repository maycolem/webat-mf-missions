// /src/app/rootReducer.js
import { userReducer } from "@/features";
import { missionApi } from "@/features/mission/missionApi";
import { combineReducers } from "@reduxjs/toolkit";

// Combina todos los reducers en un solo reducer raíz
const rootReducer = combineReducers({
  // Agrega más reducers según sea necesario
  user: userReducer,
  [missionApi.reducerPath]: missionApi.reducer,
});

export default rootReducer;
