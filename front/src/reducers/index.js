import { combineReducers } from "redux";

export default function createReducer(injectReducers = {}, routerReducer) {
    return combineReducers({
        router: routerReducer, // Include the router key
        ...injectReducers,
    });
}
