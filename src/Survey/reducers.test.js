import {
  surveyConfigStatusReducer,
  surveyConfigValuesReducer
} from "./reducers";
import * as types from "./actionsTypes";

describe("reducers", () => {
  describe("surveyConfigStatusReducer", () => {
    it("should be 'null' as default", () => {
      expect(surveyConfigStatusReducer(undefined, {})).toBeNull();
    });

    it("should be 'loading' on FETCH_SURVEY_CONFIG_REQUEST", () => {
      expect(
        surveyConfigStatusReducer(undefined, {
          type: types.FETCH_SURVEY_CONFIG_REQUEST
        })
      ).toBe("loading");
    });

    it("should be 'failure' on FETCH_SURVEY_CONFIG_FAILURE", () => {
      expect(
        surveyConfigStatusReducer(undefined, {
          type: types.FETCH_SURVEY_CONFIG_FAILURE
        })
      ).toBe("fail");
    });

    it("should be 'success' on FETCH_SURVEY_CONFIG_SUCCESS", () => {
      expect(
        surveyConfigStatusReducer(undefined, {
          type: types.FETCH_SURVEY_CONFIG_SUCCESS
        })
      ).toBe("success");
    });
  });

  describe("surveyConfigValuesReducer", () => {
    it("should be null as default", () => {
      expect(surveyConfigValuesReducer(undefined, {})).toBeNull();
    });

    it("should be null on FETCH_SURVEY_CONFIG_REQUEST", () => {
      expect(
        surveyConfigValuesReducer(undefined, {
          type: types.FETCH_SURVEY_CONFIG_REQUEST
        })
      ).toBeNull();
    });

    it("should be the response data when FETCH_SURVEY_CONFIG_SUCCESS", () => {
      const data = { data: "data values" };
      expect(
        surveyConfigValuesReducer(undefined, {
          type: types.FETCH_SURVEY_CONFIG_SUCCESS,
          data
        })
      ).toBe(data);
    });

    it("should be the error when FETCH_SURVEY_CONFIG_FAILURE", () => {
      const error = "An error";
      expect(
        surveyConfigValuesReducer(undefined, {
          type: types.FETCH_SURVEY_CONFIG_FAILURE,
          error
        })
      ).toBe(error);
    });
  });
});
