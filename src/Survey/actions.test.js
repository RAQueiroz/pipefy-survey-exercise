import * as api from "./api";
import { fetchSurveyConfig, updateSurveyData, submitSurvey } from "./actions";
import * as types from "./actionsTypes";
import thunk from "redux-thunk";
import createMockStore from "redux-mock-store";

// Mock store
const mockStore = createMockStore([thunk]);

describe("actions", () => {
  describe("fetchSurveyConfig", () => {
    afterEach(() => {
      delete api.fetchSurveyConfig.impl;
    });

    it("creates FETCH_SURVEY_CONFIG_SUCCESS when success", () => {
      // Mocks the response of the fetchSurveyConfig api call
      const data = {
        publicForm: {
          publicFormSettings: {
            organizationName: "Pipefy Recruitment Test",
            submitButtonText: "Submit",
            title: "Recruitment Survey"
          },
          formFields: [
            {
              id: "your_name",
              label: "Your name",
              __typename: "ShortTextField"
            },
            {
              id: "your_bio",
              label: "Your Bio",
              __typename: "LongTextField"
            },
            {
              id: "primary_skill",
              label: "Primary Skill",
              options: [
                "Structured Programming",
                "Object-oriented Programming",
                "Functional Programming"
              ],
              __typename: "SelectField"
            },
            {
              id: "javascript_library_of_choice",
              label: "Javascript library of choice",
              options: ["React", "Angular", "Vue"],
              __typename: "RadioVerticalField"
            },
            {
              id: "additional_experience",
              label: "Additional Experience",
              options: ["TDD", "Heroku", "Github"],
              __typename: "ChecklistVerticalField"
            },
            {
              id: "start_date",
              label: "Start Date",
              __typename: "DateField"
            }
          ]
        }
      };

      api.fetchSurveyConfig.impl = () => Promise.resolve(data);

      const store = mockStore({});
      const expectedActions = [
        { type: types.FETCH_SURVEY_CONFIG_REQUEST },
        { type: types.FETCH_SURVEY_CONFIG_SUCCESS, data }
      ];

      // Dispatches the fetch survey config action
      return store.dispatch(fetchSurveyConfig()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("creates FETCH_SURVEY_CONFIG_FAILURE when fail", () => {
      const error = "An error";
      api.fetchSurveyConfig.impl = () => Promise.reject(error);

      const store = mockStore({});
      const expectedActions = [
        { type: types.FETCH_SURVEY_CONFIG_REQUEST },
        { type: types.FETCH_SURVEY_CONFIG_FAILURE, error }
      ];

      return store.dispatch(fetchSurveyConfig()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe("updateSurveyData", () => {
    it("creates UPDATE_SURVEY_DATA", () => {
      const fieldId = "inputId";
      const fieldValue = "inputValue";
      const expectedAction = {
        type: types.UPDATE_SURVEY_DATA,
        fieldId,
        fieldValue
      };

      expect(updateSurveyData(fieldId, fieldValue)).toEqual(expectedAction);
    });
  });

  describe("submitSurvey", () => {
    afterEach(() => {
      // Deletes the mock implementation for the submitSurvey
      delete api.submitSurvey.impl;
    });

    it("creates SUBMIT_SURVEY_SUCCESS when success", () => {
      const data = {};

      // Mocks the api call
      api.submitSurvey.impl = () => Promise.resolve(data);

      const store = mockStore({ survey: {} });
      const expectedActions = [
        { type: types.SUBMIT_SURVEY_REQUEST },
        { type: types.SUBMIT_SURVEY_SUCCESS, data }
      ];

      return store
        .dispatch(
          submitSurvey([
            { fieldId: "fieldOne", fieldValue: "valueOne" },
            { fieldId: "fieldTwo", fieldValue: "valueTwo" },
            { fieldId: "fieldThree", fieldValue: ["a", "b", "c"] }
          ])
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("creates SUBMIT_SURVEY_FAILURE when failure", () => {
      const error = "An error";

      // Mocks the api call
      api.submitSurvey.impl = () => Promise.reject(error);

      const store = mockStore({ survey: {} });
      const expectedActions = [
        { type: types.SUBMIT_SURVEY_REQUEST },
        { type: types.SUBMIT_SURVEY_FAILURE, error }
      ];

      return store
        .dispatch(
          submitSurvey([
            { fieldId: "fieldOne", fieldValue: ["a", "b"] },
            { fieldId: "fieldTwo", fieldValue: "valueTwo" }
          ])
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
