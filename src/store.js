import { createStore, combineReducers, applyMiddleware } from "redux";
import surveyReducer from "./Survey/reducers";
import thunk from "redux-thunk";

const appReducer = combineReducers({
  survey: surveyReducer
});

const store = createStore(appReducer, applyMiddleware(thunk));

export default store;
