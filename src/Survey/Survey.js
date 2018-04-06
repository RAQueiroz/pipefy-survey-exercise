import React, { Component } from "react";
import "./Survey.css";
import PropTypes from "prop-types";
import { FieldTextStateless } from "@atlaskit/field-text";
import { FieldTextAreaStateless } from "@atlaskit/field-text-area";
import SelectField from "./SelectField";
import RadioGroupField from "./RadioGroupField";
import ChecklistField from "./ChecklistField";
import DateField from "./DateField";
import Button from "@atlaskit/button";
import { connect } from "react-redux";
import * as actions from "./actions";

export class Survey extends Component {
  static propTypes = {
    survey: PropTypes.array.isRequired,
    surveyData: PropTypes.object.isRequired,
    fetchSurveyConfig: PropTypes.func.isRequired,
    updateSurveyData: PropTypes.func.isRequired,
    submitSurvey: PropTypes.func.isRequired
  };

  static defaultProps = {
    survey: [],
    surveyData: {},
    fetchSurveyConfig: () => {},
    updateSurveyData: () => {},
    submitSurvey: () => {}
  };

  constructor(props) {
    super(props);
    this.onInputFieldChange = this.onInputFieldChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchSurveyConfig();
  }

  render() {
    // Dynamically creates the form fields based on the formFields property
    const { surveyConfig, surveyData } = this.props;

    if (surveyConfig.status === "loading") return <LoadingContainer />;
    if (surveyConfig.status === "fail") return <LoadingFailContainer />;
    if (surveyConfig.status === "success") {
      const publicForm = surveyConfig.data.publicForm;
      return (
        <section className="Survey">
          <SurveyDescription
            organizationName={publicForm.publicFormSettings.organizationName}
            title={publicForm.publicFormSettings.title}
          />
          <SurveyForm
            formFields={publicForm.formFields}
            surveyData={surveyData}
            submitButtonText={publicForm.publicFormSettings.submitButtonText}
            onInputFieldChange={this.onInputFieldChange}
            onSubmitSurvey={this.onSubmitForm}
          />
        </section>
      );
    }

    return null;
  }

  onInputFieldChange(fieldId, fieldValue) {
    this.props.updateSurveyData(fieldId, fieldValue);
  }

  onSubmitForm() {
    this.props.submitSurvey();
  }
}

function buildFormField(type) {
  switch (type) {
    case "ShortTextField":
      return ShortTextField;
    case "LongTextField":
      return LongTextField;
    case "SelectField":
      return SelectField;
    case "RadioVerticalField":
      return RadioGroupField;
    case "ChecklistVerticalField":
      return ChecklistField;
    case "DateField":
      return DateField;
    default:
      return null;
  }
}

export const SurveyDescription = ({ organizationName, title }) => (
  <div className="SurveyDescription">
    <h1>{organizationName}</h1>
    <h2>{title}</h2>
  </div>
);

export const SurveyForm = ({
  formFields,
  surveyData,
  submitButtonText,
  onInputFieldChange,
  onSubmitSurvey
}) => {
  const submitForm = e => {
    e.preventDefault();
    onSubmitSurvey();
  };

  const fields = formFields.map(({ __typename: type, ...props }) => {
    const FormField = buildFormField(type);
    return (
      <FormField
        key={props.id}
        value={surveyData[props.id]}
        onChange={onInputFieldChange}
        {...props}
      />
    );
  });
  return (
    <form onSubmit={submitForm} className="SurveyForm">
      {fields}
      <Button className="SubmitButton" appearance={"primary"} type="submit">
        {submitButtonText}
      </Button>
    </form>
  );
};

export const LoadingContainer = () => (
  <div className="LoadingContainer">Fetching survey data...</div>
);

export const LoadingFailContainer = () => (
  <div className="FailContainer">
    An error ocurred during the survey data fetching!
  </div>
);

export const ShortTextField = ({ onChange, value, ...rest }) => (
  <FieldTextStateless
    {...rest}
    shouldFitContainer={true}
    value={value}
    onChange={e => onChange(rest.id, e.target.value)}
  />
);

export const LongTextField = ({ onChange, value, ...rest }) => (
  <FieldTextAreaStateless
    {...rest}
    shouldFitContainer={true}
    value={value}
    onChange={e => onChange(rest.id, e.target.value)}
  />
);

function mapStateToProps(state) {
  return {
    surveyConfig: state.survey.config,
    surveyData: state.survey.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSurveyConfig: () => dispatch(actions.fetchSurveyConfig()),
    updateSurveyData: (fieldId, fieldValue) =>
      dispatch(actions.updateSurveyData(fieldId, fieldValue)),
    submitSurvey: fields => dispatch(actions.submitSurvey(fields))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey);

export { default as Select } from "./SelectField";
export { default as RadioGroupField } from "./RadioGroupField";
export { default as ChecklistField } from "./ChecklistField";
export { default as DateField } from "./DateField";
