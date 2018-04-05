import * as api from "./api";
import { fetchSurveyConfig, updateSurveyData } from "./actions";
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
        data: {
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
      const inputId = "inputId";
      const inputValue = "inputValue";
      const expectedAction = {
        type: types.UPDATE_SURVEY_DATA,
        inputId,
        inputValue
      };

      expect(updateSurveyData({ inputId, inputValue })).toEqual(expectedAction);
    });
  });
});
