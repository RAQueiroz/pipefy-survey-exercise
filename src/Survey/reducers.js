import * as types from "./actionsTypes";
import { combineReducers } from "redux";

export const surveyConfigStatusReducer = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_SURVEY_CONFIG_REQUEST:
      return "loading";
    case types.FETCH_SURVEY_CONFIG_FAILURE:
      return "fail";
    case types.FETCH_SURVEY_CONFIG_SUCCESS:
      return "success";
    default:
      return state;
  }
};

export const surveyConfigValuesReducer = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_SURVEY_CONFIG_REQUEST:
      return null;
    case types.FETCH_SURVEY_CONFIG_SUCCESS:
      return action.data;
    case types.FETCH_SURVEY_CONFIG_FAILURE:
      return action.error;
    default:
      return state;
  }
};

export const surveyConfigReducer = combineReducers({
  status: surveyConfigStatusReducer,
  values: surveyConfigValuesReducer
});
