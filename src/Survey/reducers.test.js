import {
  surveyConfigStatusReducer,
  surveyConfigValuesReducer,
  surveyDataReducer,
  surveySubmitStatusReducer,
  surveySubmitResponseReducer
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

    it("should be 'fail' on FETCH_SURVEY_CONFIG_FAILURE", () => {
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

  describe("surveyDataReducer", () => {
    it("should return an empty object as default", () => {
      expect(surveyDataReducer(undefined, {})).toEqual({});
    });

    it("should create field it doesn't exist", () => {
      expect(
        surveyDataReducer(
          {},
          {
            type: types.UPDATE_SURVEY_DATA,
            fieldId: "newField",
            fieldValue: "new data"
          }
        )
      ).toEqual({
        newField: "new data"
      });
    });

    it("should replace field value when it already exist", () => {
      expect(
        surveyDataReducer(
          {
            oldField: "old field value"
          },
          {
            type: types.UPDATE_SURVEY_DATA,
            fieldId: "oldField",
            fieldValue: "new field value"
          }
        )
      ).toEqual({
        oldField: "new field value"
      });
    });
  });

  describe("surveySubmitStatusReducer", () => {
    it("should be null as default", () => {
      expect(surveySubmitStatusReducer(undefined, {})).toBeNull();
    });

    it("should be 'submitting' on SUBMIT_SURVEY_REQUEST", () => {
      expect(
        surveySubmitStatusReducer(undefined, {
          type: types.SUBMIT_SURVEY_REQUEST
        })
      ).toBe("submitting");
    });

    it("should be 'fail' when SUBMIT_SURVEY_FAILURE", () => {
      expect(
        surveySubmitStatusReducer(undefined, {
          type: types.SUBMIT_SURVEY_FAILURE,
          error: "An error"
        })
      ).toBe("fail");
    });

    it("should be 'success' when SUBMIT_SURVEY_SUCCESS", () => {
      expect(
        surveySubmitStatusReducer(undefined, {
          type: types.SUBMIT_SURVEY_SUCCESS,
          data: {}
        })
      ).toBe("success");
    });
  });

  describe("surveySubmitResponseReducer", () => {
    it("should return null as default", () => {
      expect(surveySubmitResponseReducer(undefined, {})).toBeNull();
    });

    it("should be null on SUBMIT_SURVEY_REQUEST", () => {
      expect(
        surveySubmitResponseReducer(undefined, {
          type: types.SUBMIT_SURVEY_REQUEST
        })
      ).toBeNull();
    });

    it("should be the response data when SUBMIT_SURVEY_SUCCESS", () => {
      const data = { responseData: "response data" };
      expect(
        surveySubmitResponseReducer(undefined, {
          type: types.SUBMIT_SURVEY_SUCCESS,
          data
        })
      ).toEqual(data);
    });

    it("should be response error when SUBMIT_SURVEY_FAILURE", () => {
      const error = "An error";
      expect(
        surveySubmitResponseReducer(undefined, {
          type: types.SUBMIT_SURVEY_FAILURE,
          error
        })
      ).toEqual(error);
    });
  });
});
