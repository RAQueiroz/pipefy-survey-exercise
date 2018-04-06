import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeReactAdapter from "enzyme-adapter-react-16";
import {
  Survey,
  ShortTextField,
  LongTextField,
  Select,
  RadioGroupField,
  ChecklistField,
  DateField,
  LoadingContainer,
  LoadingFailContainer,
  SurveyForm,
  SurveyDescription,
  SubmitButton
} from "./Survey";

Enzyme.configure({
  adapter: new EnzymeReactAdapter()
});

describe("Survey", () => {
  describe("when surveyConfig is not loaded yet", () => {
    it("does not render anything", () => {
      const wrapper = shallow(
        <Survey
          surveyConfig={{
            status: null
          }}
        />
      );
      expect(wrapper.children().length).toBe(0);
    });
  });

  describe("when surveyConfig is loading", () => {
    it("renders a loading container", () => {
      const wrapper = shallow(
        <Survey
          surveyConfig={{
            status: "loading"
          }}
        />
      );
      expect(wrapper.find(LoadingContainer).length).toBe(1);
    });
  });

  describe("when surveyConfig is loaded with fail", () => {
    it("renders a error container", () => {
      const wrapper = shallow(
        <Survey
          surveyConfig={{
            status: "fail"
          }}
        />
      );
      expect(wrapper.find(LoadingFailContainer).length).toBe(1);
    });
  });

  describe("when surveyConfig is loaded with success", () => {
    let wrapper;

    function buildWrapper(method = shallow) {
      return method(
        <Survey
          surveyConfig={{
            status: "success",
            data: {
              publicForm: {
                publicFormSettings: {},
                formFields: []
              }
            }
          }}
        />
      );
    }

    it("renders a SurveyForm", () => {
      wrapper = buildWrapper();
      expect(wrapper.find(SurveyForm).length).toBe(1);
    });

    it("renders a SurveyDescription", () => {
      wrapper = buildWrapper();
      expect(wrapper.find(SurveyDescription).length).toBe(1);
    });

    it("renders a SubmitButton", () => {
      wrapper = buildWrapper(mount);
      expect(wrapper.find("button").length).toBe(1);
    });
  });

  describe("rendering components", () => {
    function rendersSurvey(formFields = [], method = mount) {
      const props = {
        surveyConfig: {
          status: "success",
          data: {
            publicForm: {
              formFields,
              publicFormSettings: {}
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
            publicForm: {
              publicFormSettings: {},
              formFields: [
                { __typename: "ShortTextField", id: "short" },
                { __typename: "LongTextField", id: "long" }
              ]
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
            publicForm: {
              publicFormSettings: {},
              formFields: [
                { __typename: "ShortTextField", id: "short" },
                { __typename: "LongTextField", id: "long" }
              ]
            }
          }
        }}
      />
    );
    wrapper.instance().onSubmitForm();
    expect(submitSurvey.mock.calls.length).toBe(1);
  });
});
