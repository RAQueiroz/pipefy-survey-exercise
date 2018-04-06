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
  data: surveyConfigValuesReducer
});

export const surveyDataReducer = (state = {}, action) => {
  switch (action.type) {
    case types.RESET_SURVEY_DATA:
      return {};
    case types.UPDATE_SURVEY_DATA:
      const newState = Object.assign({}, state);
      newState[action.fieldId] = action.fieldValue;
      return newState;
    default:
      return state;
  }
};

export const surveySubmitStatusReducer = (state = null, action) => {
  switch (action.type) {
    case types.RESET_SUBMIT_STATUS:
      return null;
    case types.SUBMIT_SURVEY_REQUEST:
      return "submitting";
    case types.SUBMIT_SURVEY_FAILURE:
      return "fail";
    case types.SUBMIT_SURVEY_SUCCESS:
      return "success";
    default:
      return state;
  }
};

export const surveySubmitResponseReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SUBMIT_SURVEY_REQUEST:
      return {};
    case types.SUBMIT_SURVEY_FAILURE:
      return action.error;
    case types.SUBMIT_SURVEY_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

export const surveySubmitReducer = combineReducers({
  status: surveySubmitStatusReducer,
  response: surveySubmitResponseReducer
});

const surveyReducer = combineReducers({
  config: surveyConfigReducer,
  data: surveyDataReducer,
  submit: surveySubmitReducer
});

export default surveyReducer;
