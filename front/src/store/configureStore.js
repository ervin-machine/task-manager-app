import { createStore, combineReducers, applyMiddleware } from "redux";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import { thunk } from "redux-thunk"; // ✅ Correct import for ES module compatibility

import userReducer from "../features/User/store/reducers";
import taskReducer from "../features/Task/store/reducers";

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({ 
  history: createBrowserHistory(),
});

export const store = createStore(
  combineReducers({
    router: routerReducer,
    user: userReducer,
    task: taskReducer
  }),
  applyMiddleware(routerMiddleware, thunk)
);

export const history = createReduxHistory(store);
