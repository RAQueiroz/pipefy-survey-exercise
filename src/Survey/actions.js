import * as api from "./api";
import * as types from "./actionsTypes";

const fetchSurveyConfigRequest = () => ({
  type: types.FETCH_SURVEY_CONFIG_REQUEST
});

const fetchSurveyConfigSuccess = data => ({
  type: types.FETCH_SURVEY_CONFIG_SUCCESS,
  data
});

const fetchSurveyConfigFailure = error => ({
  type: types.FETCH_SURVEY_CONFIG_FAILURE,
  error
});

export const fetchSurveyConfig = () => {
  return dispatch => {
    dispatch(fetchSurveyConfigRequest());
    return api
      .fetchSurveyConfig()
      .then(data => {
        dispatch(fetchSurveyConfigSuccess(data));
      })
      .catch(error => {
        dispatch(fetchSurveyConfigFailure(error));
      });
  };
};

export const updateSurveyData = ({ inputId, inputValue }) => ({
  type: types.UPDATE_SURVEY_DATA,
  inputId,
  inputValue
});

const submitSurveyRequest = () => ({
  type: types.SUBMIT_SURVEY_REQUEST
});

const submitSurveySuccess = data => ({
  type: types.SUBMIT_SURVEY_SUCCESS,
  data
});

const submitSurveyFailure = error => ({
  type: types.SUBMIT_SURVEY_FAILURE,
  error
});

export const submitSurvey = fields => {
  return dispatch => {
    dispatch(submitSurveyRequest());
    return api
      .submitSurvey(fields)
      .then(data => {
        dispatch(submitSurveySuccess(data));
      })
      .catch(error => {
        dispatch(submitSurveyFailure(error));
      });
  };
};
