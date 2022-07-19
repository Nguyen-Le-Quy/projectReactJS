import { applyMiddleware, combineReducers, createStore } from "redux";
import cartReducer from "./reducers/cartReducers";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";
import { loadingBarReducer } from "react-redux-loading-bar";

const rootReducer = combineReducers({
  auth: cartReducer,
  loadingBar: loadingBarReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(createStateSyncMiddleware())
);
initMessageListener(store);
export default store;
