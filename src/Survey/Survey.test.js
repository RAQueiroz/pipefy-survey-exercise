import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeReactAdapter from "enzyme-adapter-react-16";
import {
  Survey,
  ShortTextField,
  LongTextField,
  Select,
  RadioGroupField,
  ChecklistField,
  DateField
} from "./Survey";

Enzyme.configure({
  adapter: new EnzymeReactAdapter()
});

describe("Survey", () => {
  describe("rendering components", () => {
    function rendersSurvey(formFields = [], method = shallow) {
      const props = {
        surveyConfig: {
          status: "success",
          data: {
            data: {
              publicForm: {
                formFields
              }
            }
          }
        }
      };
      return method(<Survey {...props} />);
    }

    it("renders short text field", () => {
      const wrapper = rendersSurvey([
        {
          id: "shortField",
          label: "Short field",
          __typename: "ShortTextField"
        }
      ]);
      expect(wrapper.find(ShortTextField).length).toBe(1);
    });

    it("renders long text field", () => {
      const wrapper = rendersSurvey([
        {
          id: "longField",
          label: "Long field",
          __typename: "LongTextField"
        }
      ]);
      expect(wrapper.find(LongTextField).length).toBe(1);
    });

    it("renders select field", () => {
      const wrapper = rendersSurvey([
        {
          id: "selectField",
          label: "Select field",
          options: ["option one", "option two", "option three"],
          __typename: "SelectField"
        }
      ]);
      expect(wrapper.find(Select).length).toBe(1);
    });

    it("renders radio group field", () => {
      const wrapper = rendersSurvey([
        {
          id: "radioGroupField",
          label: "Radio group field",
          options: ["Option 1", "Option 2", "Option 3"],
          __typename: "RadioVerticalField"
        }
      ]);
      expect(wrapper.find(RadioGroupField).length).toBe(1);
    });

    it("renders checkbox group field", () => {
      const wrapper = rendersSurvey([
        {
          id: "checkboxGroupField",
          label: "Checkbox group field",
          options: ["One", "Two", "Three", "Four"],
          __typename: "ChecklistVerticalField"
        }
      ]);
      expect(wrapper.find(ChecklistField).length).toBe(1);
    });

    it("renders a date field", () => {
      const wrapper = rendersSurvey([
        {
          id: "dateField",
          label: "Date field",
          __typename: "DateField"
        }
      ]);
      expect(wrapper.find(DateField).length).toBe(1);
    });
  });

  it("calls updateSurveyData on input change", () => {
    const updateSurveyData = jest.fn();
    const wrapper = shallow(
      <Survey
        updateSurveyData={updateSurveyData}
        surveyConfig={{
          status: "success",
          data: {
            data: {
              publicForm: {
                formFields: [
                  { __typename: "ShortTextField", id: "short" },
                  { __typename: "LongTextField", id: "long" }
                ]
              }
            }
          }
        }}
      />
    );
    wrapper.instance().onInputFieldChange("short", "New short value");
    expect(updateSurveyData.mock.calls.length).toBe(1);
    expect(updateSurveyData.mock.calls[0]).toEqual([
      "short",
      "New short value"
    ]);
  });

  it("calls submitSurvey on submit form", () => {
    const submitSurvey = jest.fn();
    const wrapper = shallow(
      <Survey
        submitSurvey={submitSurvey}
        surveyConfig={{
          status: "success",
          data: {
            data: {
              publicForm: {
                formFields: [
                  { __typename: "ShortTextField", id: "short" },
                  { __typename: "LongTextField", id: "long" }
                ]
              }
            }
          }
        }}
      />
    );
    wrapper.instance().onSubmitForm();
    expect(submitSurvey.mock.calls.length).toBe(1);
  });
});
